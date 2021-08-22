const stripe = require('stripe')('sk_test_51JRFzZF8cwCrjSdRwY9lmc5KEKR9Htou50nco2UBM6AkSEnYsOW6NjRPhNKycJxQUUHQPfmda8BwdYhsi0eQtY6p00yzOkArh6')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const { PrismaClient } = require('@prisma/client')
const { nanoid } = require('nanoid')

const app = require('express')()
const prisma = new PrismaClient()

cloudinary.config({
  cloud_name: 'ddcyo820z',
  api_key: '374861455311391',
  api_secret: 'xfVsy0pQp0Zj5VmMgqG1st6BxAk'
})

const YOUR_DOMAIN = 'http://localhost:3000/'

app.use(bodyParser({limit: '50mb'}) )

app.post('/create-checkout-session', async (req, res) => {
  const { nameSurname, vaccine, date, image } = req.body

  const uploadedCertificate = await cloudinary.v2.uploader.upload(image, { public_id: `${nameSurname}_certificate_${nanoid()}` }, (error, result) => result)

  console.log(uploadedCertificate);

  try {
    await prisma.order.create({
      data: {
        nameSurname,
        vaccine,
        date
      }
    })

    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['LT']
      },
      line_items: [
        {
          price_data: {
            currency: 'EUR',
            unit_amount: 999,
            product_data: {
              name: `${nameSurname} pasiskiepyjimo DIPLOMAS`,
              images: [uploadedCertificate.secure_url],
            }
          },
          quantity: 1
        }
      ],
      payment_method_types: [
        'card'
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`
    })

    res.json({ redirectUrl: session.url })
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 'something_went_wrong' })
  }

})

module.exports = app
