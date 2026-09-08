import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";

type MissingPageProps = {
  locale: Locale;
  dict: Dictionary;
};

export function MissingPage({ locale, dict }: MissingPageProps) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center sm:py-32">
      <FadeIn immediate>
        <p className="font-display text-7xl font-semibold tracking-tight text-primary sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
          {dict.notFound.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          {dict.notFound.description}
        </p>
        <Button
          href={localePath(locale, "/")}
          variant="accent"
          className="mt-10"
        >
          {dict.notFound.backHome}
        </Button>
      </FadeIn>
    </Container>
  );
}
