// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Button } from '../buttons';
// import {
//   LandingCard,

//   HeroTitle,
//   HeroText,
//   CTAButton,
//   Footer,
//   Header,
//   LogoText,
//   NavLinks,
//   PoweredBy
// } from './LandingPage.styles';
// import { ScreenContainer } from "../home/Home.styles";

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <ScreenContainer>
//     <LandingCard>
//         <Header>
//         <LogoText onClick={() => navigate("/")}>IAMCOLLECTIVE</LogoText>
//         <NavLinks>
//           <a href="#main">Main</a>
//           <a href="#contact">Contact</a>
//           <a href="#about">About</a>
//           <a href="#help">Help</a>
//         </NavLinks>
//       </Header>
   

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.8 }}
//       >
//         <HeroTitle>Your Safety. Your Space. Your Power.</HeroTitle>
//         <HeroText>
//           Feel secure, supported, and connected — wherever you go. Join a
//           community dedicated to women’s safety and empowerment.
//         </HeroText>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.8 }}
//       >
//         <CTAButton size="lg" onClick={() => navigate("/continue")}>
//           Get Started
//         </CTAButton>
//       </motion.div>

//       <Footer>
//         <p>Safe. Strong. Connected.</p>

//         <PoweredBy>
//           <span>Powered by</span>
//           <img src="/MTN-Logo.png" alt="MTN Logo" />
//           <span>|</span>
//           <img src="/chenosis.png" alt="Chenosis Logo" />
//         </PoweredBy>
//       </Footer>
//     </LandingCard>
//     </ScreenContainer>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ScreenContainer,
  StyledContainer,
  PinkButton,
  CardWrapper,
} from "./LandingPage.styles";

import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      <StyledContainer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(180deg, #FAF0E6 0%, #FDEDF4 100%)",
          padding: "2rem",
          gap: "1.5rem",
        }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a1a" }}>
            Your Safety. Your Space. Your Power.
          </h1>
          {/* <p style={{ fontSize: "1.25rem", maxWidth: "400px", color: "#6b7280" }}>
            Feel secure, supported, and connected — wherever you go. Join a
            community dedicated to women’s safety and empowerment.
          </p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <PinkButton onClick={() => navigate("/continue")}>
            Get Started
          </PinkButton>
        </motion.div>

        {/* Optional card section */}
        <CardWrapper
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            maxWidth: "600px",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>Why Join IAM Collective?</h2>
          <p style={{ color: "#6b7280" }}>
            Connect with a safe and supportive community. Share experiences,
            learn from others, and empower yourself and those around you.
          </p>
        </CardWrapper>

        {/* Footer */}
        <p style={{ marginTop: "2rem", color: "#6b7280" }}>
          Safe. Strong. Connected.
        </p>
      </StyledContainer>
    </ScreenContainer>
  );
}
