import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalDocumentCopy = {
  title: string;
  updatedLabel: string;
  updatedDate: string;
  intro: string;
  sections: LegalSection[];
};

type LegalPageProps = {
  copy: LegalDocumentCopy;
};

export function LegalPage({ copy }: LegalPageProps) {
  return (
    <Container className="py-16 sm:py-24">
      <FadeIn immediate>
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {copy.updatedLabel}: {copy.updatedDate}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">{copy.intro}</p>

          <div className="mt-12 space-y-10">
            {copy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-xl font-semibold tracking-tight text-secondary sm:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-base leading-relaxed text-secondary/90"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items && section.items.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-secondary/90">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </FadeIn>
    </Container>
  );
}
