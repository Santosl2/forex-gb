import { useEffect } from "react";

import { motion, Variants } from "framer-motion";

import { Logo } from "@/components/atoms";
import { RegisterForm } from "@/components/templates";
import { SEO } from "@/SEO";
import { CAPTCHA_CLIENT_KEY } from "@/shared/constants";
import { GuestSSR } from "@/shared/utils/auth/GuestSSR";

const registerVariants: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function Register() {
  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: () => void) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${CAPTCHA_CLIENT_KEY}`,
      () => {
        console.log("Script loaded!");
      }
    );

    return () => {
      const isScriptExist = document.getElementById("recaptcha-key");

      if (isScriptExist) {
        const recaptchaDIV =
          document.getElementsByClassName("grecaptcha-badge")[0];

        recaptchaDIV?.remove();
        document.body.removeChild(isScriptExist);
      }
    };
  }, []);

  return (
    <>
      <SEO title="Register" />

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={registerVariants}
        className="flex flex-col items-center justify-center h-full p-8"
      >
        <Logo />

        <RegisterForm />
      </motion.div>
    </>
  );
}

export const getServerSideProps = GuestSSR(async (ctx) => {
  return {
    props: {},
  };
});
