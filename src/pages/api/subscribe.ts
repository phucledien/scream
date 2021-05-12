const mailchimp = require('@mailchimp/mailchimp_marketing')

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER
})
const listId = process.env.MAILCHIMP_LIST_ID

export default async function run(req, res) {
    const subscribingUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }

    try {
        await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        })

        res.status(200).json({
            msg: 'Successfully added contact as an audience member.'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'An error occurred!'
        })
    }
}
