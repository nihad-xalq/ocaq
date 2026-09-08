import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { Dictionary } from "@/i18n/get-dictionary";

type ServicesSectionProps = {
  dict: Dictionary;
};

export function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <Container as="section" id="services" className="py-20 sm:py-24">
      <FadeIn>
        <SectionHeading
          title={dict.services.title}
          subtitle={dict.services.subtitle}
        />
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service, index) => {
          const item = dict.servicesItems[service.id];
          return (
            <FadeIn key={service.id} delay={index * 60}>
              <article className="group relative border-t border-primary/40 pt-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="font-display text-4xl font-semibold text-primary/40 transition-colors group-hover:text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-secondary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </Container>
  );
}
