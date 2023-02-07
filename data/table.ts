import { z } from "zod";

export const TableSchema = z.object({
    id: z.string(),
    data_rows: z.array(z.any())
})
