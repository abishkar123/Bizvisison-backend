import nodemailer from 'nodemailer';

//configuration and send email

const sendEmail =async (emailbody)=>{
    try {

     const transporter = nodemailer.createTransport({
         service: "gmail",
        host: process.env.SMTP,
        port: 587,
         auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        //send email 
        const info = await transporter.sendMail(emailbody)
        
    } catch (error) {
        console.log(error)
        
    }
};



//email tamplate

export const newAccountEamilVerification = (link, obj)=>{
  
    const emailbody = {
        from: process.env.EMAIL_ADMIN,
        to: process.env.EMAIL_USER,
        subject: "Please Verify My Email To Get Access To Admin Dashboard",
        text: "Plase follow the link to verify your account ",

        html: `
        <p>
            Hi BizVision Team
        </p>
      
        
        <p> I am ${obj.fname} ${obj.lname}. 
          Please follow the link below to verify my new account. So, I Can get access.
        </p>
         <p> Please verify your email address.
              
        <a href= ${link} > ${link} </a>
        </p>
        
         <p>
          Best Regards, 
          <br>
         ${obj.fname}  ${obj.lname}
         </p>
        `,

    }

    sendEmail(emailbody) 


}


// email verified notification
export const emailVerifiedNotification = ({ fname, email }) => {
   
    const emailBody = {
      from: `"Bizvision", <${process.env.EMAIL_ADMIN}>`,
      to:email,
      subject: "Account verified",
      text: "Your account has been verified. You may login now",
      html: `
          <p>
              Hi ${fname}
          </p>
          <br />
          
          <p>
          Your account has been verified. You may login now
          </p>
          <br >
  <p>
   <a href= "${process.env.FRONTEND_ROOT_URL}" style="background:green; color: white; padding:1rem 2.5px"> Login </a>
      </p>
      <br >
      <p>
      Best Regards, 
     BizVision Team
  </p>
          `,
    };
  
    sendEmail(emailBody);
  };


  export const resetPassEmailVerifiedNotification = (link, obj ) => {
    const emailBody = {
      from: `"bizvison", <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Pasword reset OTP",
      text: "we are sending OTP",
      html: `
          <p>
              Hi ${obj.email}
              ${obj.token}
  
          </p>
          <br />
          
          <p>
          Please 6 digits OTP for password reset.
          </p>
          <br >
  
      
      <p>
      Regards, 
      <br>
     BizVision Team
  </p>
          `,
    };
  
    sendEmail(emailBody);
  };
  
  // email otp
  export const emailOtp = ({ token, email, fname}) => {
    console.log(fname)
    const emailBody = {
      from: `"BizVison", <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OPT for password reset",
      text: "Use the following otp to reset your password " + token,
      html: `
          <p>
              Hi ${fname},
          </p>

          
          <p>
          Here is your opt to reset your password
          </p>
          <br >
  
                 ${token}
    
      
      <p>
      Regards, 
      <br>
   Bizvision Team
  </p>
          `,
    };
  
    sendEmail(emailBody);
  };
  
  // password update notification
  export const passwordUpdateNotification = ({ fName, email }) => {
    const emailBody = {
      from: `"BizVision", <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your password has been updaetd",
      text: "Just to notify that you password has been just updated, if this wasn't you, conact us asap or change your password. ",
      html: `
          <p>
              Hi ${fName},
          </p>
       
          
          <p>
          Just to notify that you password has been just updated, if this wasn't you, conact us asap or change your password.
          </p>
      
    
      <p>
      Best Regards, 
      <br>
     BizVison Team
  </p>
          `,
    };
  
    sendEmail(emailBody);
  };