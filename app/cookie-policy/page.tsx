import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    `How ${SITE.name} uses cookies and similar technologies on this website, and how you can control them.`,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <section className="section">
      <div className="container-site max-w-3xl">
        <h1 className="text-4xl">Cookie Policy</h1>
        <p className="mt-3 text-ink-muted">Last updated: July 2026</p>
        <div className="article-body mt-8">
          <p>
            Talent Trek Pty Ltd (ABN {SITE.abn}) (“we”, “us”) uses cookies and
            similar technologies on our website to keep it working, remember your
            choices, and — where you agree — understand how people use the site.
            This policy explains what we use and how you can control it. It
            should be read alongside our{" "}
            <a href="/privacy" className="text-accent underline">
              Privacy Policy
            </a>
            .
          </p>

          <h2>1. What are cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help the site remember things like your preferences or
            whether you’ve already seen a message. Other similar technologies —
            such as local storage — do similar jobs, and we treat them the same
            way in this policy.
          </p>

          <h2>2. The cookies we use</h2>
          <p>
            We use two types of cookies on our site:
          </p>
          <ul>
            <li>
              <strong>Essential cookies.</strong> These are needed for the site
              to work properly — for example, to remember your cookie consent
              choice so we don’t keep asking you. They do not personally
              identify you and you cannot switch them off.
            </li>
            <li>
              <strong>Analytics cookies.</strong> With your consent, we use
              Google Analytics to collect anonymised information about how
              visitors use the site — such as which pages are viewed and how
              long people stay. This helps us improve the site and does not
              tell us who individual visitors are. If you decline analytics
              cookies, we do not set these.
            </li>
          </ul>
          <p>
            We do not currently use advertising cookies, social media tracking
            pixels, or other third-party tracking on our site.
          </p>

          <h2>3. Google Analytics</h2>
          <p>
            Where you consent, we use Google Analytics 4, a web analytics service
            provided by Google. Google may use cookies to collect information
            about your use of the site, including your IP address. That
            information is generally transmitted to and stored on Google servers.
            Google uses the information to evaluate your use of the site, to
            compile reports on website activity, and to provide other services
            relating to website activity and internet usage.
          </p>
          <p>
            We have configured Google Analytics to use IP anonymisation, so your
            full IP address is not stored in full. You can read Google’s privacy
            policy at{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              https://policies.google.com/privacy
            </a>
            .
          </p>

          <h2>4. How to control cookies</h2>
          <p>
            When you first visit our site, you can accept or decline analytics
            cookies using our consent banner. You can change your mind at any
            time by clearing your cookies or using the consent control on the
            site.
          </p>
          <p>
            You can also control cookies through your browser settings. Most
            browsers let you:
          </p>
          <ul>
            <li>see what cookies are stored and delete them individually;</li>
            <li>block all or some cookies;</li>
            <li>delete all cookies when you close the browser.</li>
          </ul>
          <p>
            Be aware that if you turn off essential cookies, some parts of the
            site may not work as expected. If you turn off analytics cookies,
            you can still use the site normally — we just won’t get the
            anonymised usage data.
          </p>

          <h2>5. Updates to this policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Where changes are
            significant, we will take reasonable steps to let you know. The
            current version is always available on our website, and the “Last
            updated” date at the top of this page reflects the most recent
            version.
          </p>

          <h2>6. Opting out of analytics</h2>
          <p>
            If you do not want Google Analytics to collect information about your
            use of our website, you can opt out at any time by:
          </p>
          <ul>
            <li>
              declining analytics cookies when our consent banner appears on your
              first visit; or
            </li>
            <li>
              installing the Google Analytics opt-out browser add-on available at{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              .
            </li>
          </ul>
          <p>
            Opting out will not prevent you from using our website.
          </p>

          <h2>7. Contact us</h2>
          <p>
            If you have any questions about our use of cookies, contact us:
          </p>
          <p>
            Talent Trek Pty Ltd
            <br />
            {SITE.address.full}
            <br />
            Email:{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-accent underline"
            >
              {SITE.email}
            </a>
            <br />
            Phone: {SITE.phone.display}
          </p>
        </div>
      </div>
    </section>
  );
}
