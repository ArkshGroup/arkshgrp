import { CollectionConfig } from 'payload'
import { sendAdminNotificationEmail, sendRegistrationEmail } from '../services/MailService'

const Bookings: CollectionConfig = {
    slug: 'bookings',
    admin: {
        group: 'BOOKINGS',
    },
    access: {
        read: () => true,
        create: () => true,

        update: ({ req }) => {
            return (
                req.user?.role === 'admin'  || req.user?.role === 'editor'
            )
        },
        delete: ({ req }) => {
            return req.user?.role === 'admin'
        },
    },
    fields: [
        {
            name: 'registrationNumber',
            type: 'number',
            required: false,
            label: 'Registration Number',
            admin: {
                readOnly: true,
                description: 'Auto-generated sequential registration number',
            },
        },
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Full Name',
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
            label: 'Email Address',
        },
        {
            name: 'phone',
            type: 'text',
            required: true,
            label: 'Phone Number',
        },
        {
            name: 'dob',
            type: 'date',
            required: true,
            label: 'Date of Birth',
        },
        {
            name: 'age',
            type: 'number',
            required: true,
            label: 'Age',
        },
        {
            name: 'gender',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'Male',
                    value: 'male',
                },
                {
                    label: 'Female',
                    value: 'female',
                },
                {
                    label: 'Other',
                    value: 'other',
                },
            ],
            label: 'Gender',
        },
        {
            name: 'address',
            type: 'text',
            required: true,
            label: 'Address',
        },
        {
            name: 'schoolName',
            type: 'text',
            required: true,
            label: 'School Name',
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                {
                    label: '6-8 years',
                    value: 'first',
                },
                {
                    label: '9-11 years',
                    value: 'second',
                },
                {
                    label: '12-14 years',
                    value: 'third',
                },
                {
                    label: '15-19 years',
                    value: 'fourth',
                },
            ],
            label: 'Category',
        },
        {
            name: 'categoryDisplay',
            type: 'text',
            required: false,
            label: 'Category Display',
        },
        {
            name: 'trainingDaysAndTime',
            type: 'text',
            required: false,
            label: 'Training Days & Time',
        },
        {
            name: 'tShirtSize',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'XS',
                    value: 'xs',
                },
                {
                    label: 'S',
                    value: 'small',
                },
                {
                    label: 'M',
                    value: 'medium',
                },
                {
                    label: 'L',
                    value: 'large',
                },
                {
                    label: 'XL',
                    value: 'extra-large',
                },
            ],
            label: 'T-Shirt Size',
        },
        {
            name: 'transportationNeed',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'Yes, I need transportation',
                    value: 'yes',
                },
                {
                    label: 'No, I have my own transportation',
                    value: 'no',
                },
            ],
            label: 'Transportation Need',
        },
        {
            name: 'dropoffLocation',
            type: 'text',
            required: true,
            label: 'Drop-off Location',
            admin: {
                condition: (data) => {
                    return data.transportationNeed === 'yes'
                },
                description: 'Required if transportation is needed',
            },
        },
        {
            name: 'status',
            type: 'select',
            label: 'Payment Status',
            defaultValue: 'pending',
            options: [
                {
                    label: 'Paid',
                    value: 'paid',
                },
                {
                    label: 'Unpaid',
                    value: 'unpaid',
                },
                {
                    label: 'Rejected',
                    value: 'rejected',
                },
                {
                    label: 'Pending',
                    value: 'pending',
                },
            ],
            admin: {
                position: 'sidebar',
            },
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data, operation, req }) => {
                // Validate dropoffLocation when transportationNeed is 'yes'
                if (data.transportationNeed === 'yes' && !data.dropoffLocation?.trim()) {
                    throw new Error('Drop-off location is required when transportation is needed')
                }

                // Auto-generate registration number on create
                if (operation === 'create' && !data.registrationNumber) {
                    try {
                        // Get the total count of existing registrations
                        const result = await req.payload.find({
                            collection: 'bookings',
                            limit: 0,
                            pagination: false,
                        })
                        // Set registration number as count + 1
                        data.bookingsNumber = (result.totalDocs || 0) + 1
                    } catch (error) {
                        console.error('Error generating registration number:', error)
                        // Fallback: use timestamp if count fails
                        data.registrationNumber = Date.now()
                    }
                }
                return data
            },
        ],
        afterChange: [
            ({ doc, operation }) => {
                // Only send email on create operation - send asynchronously without blocking
                if (operation === 'create' && doc.email) {
                    // Send emails in parallel without awaiting - fire and forget
                    // This allows registration to complete immediately
                    Promise.all([
                        sendRegistrationEmail({
                            registrationNumber: doc.registrationNumber,
                            id: doc.id,
                            name: doc.name,
                            email: doc.email,
                            phone: doc.phone,
                            dob: doc.dob,
                            age: doc.age,
                            gender: doc.gender,
                            address: doc.address,
                            schoolName: doc.schoolName,
                            category: doc.category,
                            categoryDisplay: doc.categoryDisplay || '',
                            trainingDaysAndTime: doc.trainingDaysAndTime || '',
                            tShirtSize: doc.tShirtSize,
                            transportationNeed: doc.transportationNeed,
                            dropoffLocation: doc.dropoffLocation,
                        }).catch((error) => {
                            console.error('Error sending registration email:', error)
                        }),
                        sendAdminNotificationEmail({
                            registrationNumber: doc.registrationNumber,
                            id: doc.id,
                            name: doc.name,
                            email: doc.email,
                            phone: doc.phone,
                            dob: doc.dob,
                            age: doc.age,
                            gender: doc.gender,
                            address: doc.address,
                            schoolName: doc.schoolName,
                            category: doc.category,
                            categoryDisplay: doc.categoryDisplay || '',
                            tShirtSize: doc.tShirtSize,
                        }).catch((error) => {
                            console.error('Error sending admin notification email:', error)
                        }),
                    ])
                        .then(() => {
                            console.log(`✅ Emails sent for registration: ${doc.email}`)
                        })
                        .catch(() => {
                            // Errors already logged in individual catch blocks
                        })
                }
            },
        ],
    },
}

export default Bookings
