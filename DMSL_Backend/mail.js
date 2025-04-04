const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "satvik3408@gmail.com",  
        pass: "kmdr asog mgpu dsrm",  
    }
});


const sendExamNotification = async (studentEmail, examTitle, scheduledTime) => {
    const mailOptions = {
        from: "DMSL Lab <gaikwadsatvik555@gmail.com>",  
        to: studentEmail,  
        subject: `Exam Scheduled: ${examTitle}`,
        text: `Dear Student,\n\nYour exam "${examTitle}" is scheduled on ${scheduledTime}. Please be prepared.\n\nBest Regards,\nDMSL Lab`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendExamNotification;