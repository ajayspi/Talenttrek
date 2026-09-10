import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${SITE.name} AI solutions and this website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container-site max-w-3xl">
        <h1 className="text-4xl">Terms of Service</h1>
        <p className="mt-3 text-ink-muted">Last updated: January 2026</p>
        <div className="article-body mt-8">
          <p>
            These terms govern the use of this website and any engagement
            with Talent Trek (ABN {SITE.abn}).
          </p>
          <h2>Website content</h2>
          <p>
            Content on this site is general information, not professional
            advice. While we keep it accurate and current, it may change
            without notice.
          </p>
          <h2>Services</h2>
          <p>
            Deliverables, timelines and service levels for Voice Commerce,
            Chat AI Automotive, Dynamic DriveThru and AI Agent engagements
            are defined in individual statements of work, which take
            precedence over anything on this site.
          </p>
          <h2>Intellectual property</h2>
          <p>
            Talent Trek Pty Ltd retains ownership of all intellectual property
            rights in the platform, software, designs, content, branding and
            know-how we provide. Nothing in these terms transfers ownership of
            our intellectual property to you. You receive a limited, non-exclusive,
            non-transferable right to use the services for your internal business
            purposes only. You must not copy, modify, reverse-engineer,
            sublicense or resell any part of the services without our prior
            written consent.
          </p>
          <p>
            Materials you provide to us for use with the services — including
            FAQs, menus, scripts, recordings, brand assets and documents — remain
            your property or the property of their respective owners. By providing
            them, you grant us a licence to use, process and host them solely for
            the purpose of delivering the services to you. You represent that you
            have the rights to grant that licence.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent permitted by law, Talent Trek is not liable for
            indirect or consequential loss arising from use of this website.
            Nothing here excludes rights you hold under Australian Consumer
            Law.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate an engagement for services under an
            individual statement of work in accordance with that document. We may
            suspend or terminate access to the services if you materially breach
            these terms or any applicable statement of work, or if we are required
            to do so by law. Where reasonably practicable, we will give you notice
            and an opportunity to remedy the breach before termination.
          </p>
          <p>
            On termination, your rights to use the services cease, and we may
            delete or return your data in accordance with our Privacy Policy and
            any applicable agreement, except where we are required by law to retain
            it. Provisions that by their nature should survive termination —
            including intellectual property, liability, governing law and payment
            of outstanding fees — will continue in force.
          </p>

          <h2>Governing law and disputes</h2>
          <p>
            These terms and any dispute or claim arising out of or in connection
            with them or their subject matter are governed by and construed in
            accordance with the laws of Victoria, Australia.
          </p>
          <p>
            The parties submit to the exclusive jurisdiction of the courts of
            Victoria, Australia, in relation to any such dispute or claim, except
            to the extent that a mandatory provision of applicable law provides
            otherwise.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: {SITE.email}, {SITE.phone.display},{" "}
            {SITE.address.full}.
          </p>
        </div>
      </div>
    </section>
  );
}
