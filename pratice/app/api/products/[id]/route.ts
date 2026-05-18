import { products } from './../lib/data';
import { NextResponse } from "next/server";

type Params = {
	params: Promise<{id: string}>;
};

export async function GET(req: Request, {params}: Params){
	const {id} = await params;
	const product = products.find((p) => p.id == +id);

	return NextResponse.json(product);
}

