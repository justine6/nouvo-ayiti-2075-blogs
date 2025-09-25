import { z } from "zod";

const schema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  join: z.object({
    title: z.string(),
    form: z.object({
      name: z.string(),
      email: z.string().email("Invalid email format"),
      phone: z.string().regex(/^[0-9+\-\s]+$/, "Invalid phone number"),
      location: z.string(),
      message: z.string(),
      submit: z.string()
    })
  })
});

export default schema;
