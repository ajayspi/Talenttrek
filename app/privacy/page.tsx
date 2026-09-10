import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your personal information under the Australian Privacy Principles.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container-site max-w-3xl">
        <h1 className="text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-ink-muted">Last updated: July 2026</p>
        <div className="article-body mt-8">
          <p>
            Talent Trek Pty Ltd (ABN {SITE.abn}) ("we", "us", "our") is
            committed to protecting your privacy. This policy explains how we
            collect, use, disclose and safeguard your personal information in
            accordance with the Australian Privacy Principles (APPs) under the
            Privacy Act 1988 (Cth) and any applicable state laws.
          </p>
          <p>
            By using our website or our services, you consent to the practices
            described in this policy.
          </p>

          <h2>1. Who we are</h2>
          <p>
            Talent Trek Pty Ltd is an Australian company with ABN 13 674 722 135,
            headquartered at {SITE.address.full}, Melbourne, Victoria. We
            deliver AI voice, chat and agent solutions to businesses across
            hospitality, automotive, retail, food & beverage, healthcare and IT.
          </p>
          <p>
            Contact:{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-accent underline">
              {SITE.email}
            </a>{" "}
            | Phone: {SITE.phone.display}
          </p>

          <h2>1. Who we are</h2>
          <p>
            We are Talent Trek, operating from{" "}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(SITE.address.full)}`}
              className="font-bold text-accent underline"
            >
              {SITE.address.full}
            </a>
            , Melbourne, Victoria. Our ABN is {SITE.abn}. We deploy voice,
            chat and agent AI solutions for Australian businesses and collect
            personal information both from the businesses we work with and, in
            limited cases, from their end customers.
          </p>

          <h2>2. What personal information we collect</h2>
          <p>Depending on how you interact with us, we may collect:</p>
          <ul>
            <li>
              Contact details you provide — name, email address, phone number,
              company name, job title, ABN and message content when you enquire,
              request a demo, or contact us.
            </li>
            <li>
              Conversation and transaction data provided by our business
              clients so we can build, test and operate AI assistants. This may
              include sample phone recordings, call transcripts, menu data,
              booking histories and customer enquiry logs. When we process such
              data on a client's behalf, we treat it as confidential and process
              it only for the purposes agreed in our statement of work.
            </li>
            <li>
              Technical information automatically collected when you visit our
              website — pages visited, referrer, browser type, device type,
              approximate location (derived from IP address), and anonymised
              usage analytics. We do not use this to identify individuals.
            </li>
            <li>
              Communications records — logs of emails, phone calls and meeting
              notes generated in the course of delivering our services.
            </li>
          </ul>

          <h2>3. How we collect it</h2>
          <p>
            We collect information you give us directly (for example when you
            fill in a form, send an email or call us), from your use of our
            website, and from systems and integrations we operate on behalf of
            our clients. Where we use cookies or similar technologies, we
            explain this in our{" "}
            <a href="/cookie-policy" className="font-bold text-accent underline">
              Cookie Policy
            </a>
            and obtain your consent before any non-essential tracking begins.
          </p>

          <h2>4. Why we use it</h2>
          <p>We use personal information to:</p>
          <ul>
            <li>respond to enquiries and provide the services you request;</li>
            <li>
              scope, propose and deliver AI deployments, including the work of
              configuring and tuning assistants;
            </li>
            <li>
              communicate with you about your engagement, invoices and support
              matters;
            </li>
            <li>
              meet legal and regulatory obligations, including record-keeping for
              tax, privacy and contractual purposes;
            </li>
            <li>
              improve our website and marketing — using anonymised analytics,
              not personal data;
            </li>
            <li>
              carry out quality assurance, training and audit of the AI systems
              we operate, using client data only where the client has authorised
              this in writing;
            </li>
            <li>protect against fraud, misuse or security threats.</li>
          </ul>
          <p>
            We do not use your personal information for direct marketing without
            your consent, and we do not sell or rent it to third parties.
          </p>
          <h2>5. When we disclose it to others</h2>
          <p>We may disclose personal information to:</p>
          <ul>
            <li>
              our employees and contractors who need it to deliver our services;
            </li>
            <li>
              cloud and communications providers we use to host and operate our
              platform (for example hosting, telephony and CRM providers), who
              act as recipients of personal information in the course of
              providing those services;
            </li>
            <li>
              our clients, where we are processing data on their behalf and our
              client is the responsible party for their end customers;
            </li>
            <li>
              professional advisers — accountants, lawyers and auditors — where
              necessary for our business;
            </li>
            <li>
              law enforcement or regulatory authorities if required by law.
            </li>
          </ul>
          <p>
            Where we transfer personal information overseas, we take steps
            reasonably necessary to ensure the overseas recipient is bound by
            obligations comparable to the APPs, or otherwise comply with APP 8.
          </p>

          <h2>6. Cookies and similar technologies</h2>
          <p>
            Our website uses cookies and similar technologies for essential
            functionality and, with your consent, for analytics. We use Google
            Analytics 4, which may transfer anonymised usage data to Google. Our
            cookie consent banner lets you accept or decline analytics cookies.
            You can manage cookie preferences through your browser settings at
            any time. For full details, see our{" "}
            <a href="/cookie-policy" className="font-bold text-accent underline">
              Cookie Policy
            </a>
            .
          </p>

          <h2>7. How we keep it secure</h2>
          <p>
            We take reasonable steps to protect personal information from
            misuse, interference, loss, unauthorised access, modification or
            disclosure. This includes role-based access controls, encryption in
            transit and secure configuration of the systems we operate. No
            system is immune to risk, and we cannot guarantee absolute security.
          </p>

          <h2>8. How long we keep it</h2>
          <p>
            We keep personal information for no longer than is necessary for the
            purposes for which it was collected, or as required by law, taxation
            or contractual obligations. When information is no longer needed, we
            securely destroy or de-identify it. Client conversation data used to
            build or tune AI assistants is treated according to the retention
            terms agreed with each client.
          </p>

          <h2>9. Your rights</h2>
          <p>Under the Australian Privacy Principles you have the right to:</p>
          <ul>
            <li>
              request access to the personal information we hold about you (some
              exceptions may apply);
            </li>
            <li>request correction of inaccurate or out-of-date information;</li>
            <li>
              request that we delete or de-identify information where there is no
              legitimate reason to keep it;
            </li>
            <li>complain if you believe we have mishandled your personal information.</li>
          </ul>
          <p>
            To make a request, email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
            {SITE.phone.display}. We will respond within a reasonable time. We
            may need to verify your identity before acting on a request.
          </p>
          <p>
            If you are unhappy with how we have handled your information, you can
            complain to the Office of the Australian Information Commissioner
            (OAIC) at{" "}
            <a
              href="https://www.oaic.gov.au"
              className="font-bold text-accent underline"
              target="_blank"
              rel="noreferrer"
            >
              www.oaic.gov.au
            </a>
            .
          </p>

          <h2>10. Children</h2>
          <p>
            Our services are designed for businesses and their customers. We do
            not knowingly collect personal information from children under 18. If
            we become aware that we hold such information, we will take steps to
            delete it.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Where changes are
            significant, we will take reasonable steps to bring them to your
            attention. The current version is always available on our website.
          </p>

          <h2>12. Contact us</h2>
          <p>If you have questions about this policy, contact us:</p>
          <p>
            Email:{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p>Phone: {SITE.phone.display}</p>
          <p>Address: {SITE.address.full}</p>
        </div>
      </div>
    </section>
  );
}
