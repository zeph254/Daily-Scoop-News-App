const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

/**
 * Sends welcome email when new subscriber is added
 * @type {functions.CloudFunction<functions.firestore.DocumentSnapshot>}
 */
exports.sendWelcomeEmail = functions.firestore
    .document("newsletterSubscribers/{subscriberId}")
    .onCreate(async (snap, context) => {
      const subscriber = snap.data();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: functions.config().gmail.user,
          pass: functions.config().gmail.pass,
        },
      });

      const mailOptions = {
        from: "\"Daily Scoop\" <news@dailyscoop.com>",
        to: subscriber.email,
        subject: "Welcome to Our Newsletter!",
        html: `
          <h1>Thank you for subscribing!</h1>
          <p>You'll now receive our latest updates.</p>
          <p>
            <a href="https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/unsubscribe?id=${context.params.subscriberId}">
              Unsubscribe
            </a>
          </p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        functions.logger.log("Email sent to:", subscriber.email);
      } catch (error) {
        functions.logger.error("Error sending email:", error);
      }
    });