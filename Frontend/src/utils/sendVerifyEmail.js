import emailjs from "@emailjs/browser";

export const sendVerifyEmail = (email, name, token) => {
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email: email,
      to_name: name,
      verify_link: `${import.meta.env.VITE_CLIENT_URL}/verify/${token}`
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
