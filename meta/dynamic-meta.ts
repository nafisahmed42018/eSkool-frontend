interface IMeta {
  title: string
  description: string
  keywords: string
}

export const DynamicMeta = ({ title, description, keywords }: IMeta) => {
  return {
    title: title,
    description: description,
    keywords: keywords,
  }
}
