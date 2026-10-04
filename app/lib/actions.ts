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
	customer_id: z
		.string({
			invalid_type_error: "Please select a customer",
		})
		.min(1, { message: "Please select a customer" }),
	amount: z.coerce
		.number()
		.gt(0, { message: "Please enter an amount greater than $0." }),
	status: z.enum(["pending", "paid"], {
		invalid_type_error: "Please select an invouice statuse",
	}),
	date: z.string(),
});

const CreateInvoice = formSchema.omit({
	id: true,
	date: true,
});

export type State = {
	errors: {
		customer_id?: string[];
		amount?: string[];
		status?: string[];
	};
	message: string;
};

export async function createInvoice(_prevState: State, formData: FormData) {
	const validatedFields = CreateInvoice.safeParse({
		customer_id: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Invoice.",
		};
	}

	const { customer_id, amount, status } = validatedFields.data;
	const amountInCents = amount * 100;
	const date = new Date().toISOString().split("T")[0];

	await sql`
		INSERT INTO invoices (customer_id, amount, status, date)
		VALUES (${customer_id}, ${amountInCents}, ${status}, ${date})
	`;
	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

const UpdateInvoice = formSchema.omit({
	id: true,
	date: true,
});

export async function updateInvoice(
	id: string,
	_prevState: State,
	formData: FormData,
) {
	const validatedFields = UpdateInvoice.safeParse({
		customer_id: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Invoice.",
		};
	}

	const { customer_id, amount, status } = validatedFields.data;

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
	// throw new Error("Failed to delete invoice");

	await sql`DELETE FROM invoices WHERE id = ${id}`;
	revalidatePath("/dashboard/invoices");
}
