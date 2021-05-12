const mailchimp = require('@mailchimp/mailchimp_marketing')

mailchimp.setConfig({
    apiKey: '80ffefb8c34f20fa6efab6a5ae7097d8-us1',
    server: 'us1'
})
const listId = '24312c586e'

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
