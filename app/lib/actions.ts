"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";

const databaseUrl = process.env.POSTGRES_URL;

if (!databaseUrl) {
	throw new Error("POSTGRES_URL is not configured.");
}

const sql = postgres(databaseUrl, { ssl: "require" });

const formSchema = z.object({
	id: z.string(),
	customer_id: z.string(),
	amount: z.coerce.number(),
	status: z.enum(["pending", "paid"]),
	date: z.string(),
});

const CreateInvoice = formSchema.omit({
	id: true,
	date: true,
});

export async function createInvoice(formData: FormData) {
	const { customer_id, amount, status } = CreateInvoice.parse({
		customer_id: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	const amountInCents = amount * 100;
	const date = new Date().toISOString().split("T")[0];

	try {
		await sql`
		INSERT INTO invoices (customer_id, amount, status, date)
		VALUES (${customer_id}, ${amountInCents}, ${status}, ${date})
	`;
	} catch (error) {
		console.log(error)
		return {
			message:"Database error: Failed to create invoice"
		}
	}

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

const UpdateInvoice = formSchema.omit({
	id: true,
	date: true,
});

export async function updateInvoice(id: string, formData: FormData) {
	const { customer_id, amount, status } = UpdateInvoice.parse({
		customer_id: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	const amountInCents = amount * 100;

	await sql`
		UPDATE invoices
    SET customer_id = ${customer_id}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
	`;

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}


export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}