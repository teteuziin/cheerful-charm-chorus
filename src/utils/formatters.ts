export const formatters = {
  initials(name: string): string {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("");
  },
  date(input: string | number | Date, locale = "pt-BR"): string {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(input));
  },
  time(input: string | number | Date, locale = "pt-BR"): string {
    return new Intl.DateTimeFormat(locale, { timeStyle: "short" }).format(new Date(input));
  },
  number(value: number, locale = "pt-BR"): string {
    return new Intl.NumberFormat(locale).format(value);
  },
};
