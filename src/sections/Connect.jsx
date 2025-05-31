import React, { forwardRef } from "react";
import Section from "../components/Section";

const Connect = forwardRef((props, ref) => {
  return (
    <Section ref={ref} title="Connect">
      <p className="text-white">Connect content.</p>
    </Section>
  );
});

export default Connect;
