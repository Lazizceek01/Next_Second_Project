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


// Short form
export async function DELETE(req: Request, {params}: Params){
	const {id} = await params;
	console.log(id);
	const index = products.findIndex((p) => p.id == +id);
	console.log(index);
	products.splice(index, 1)
	console.log(products);
	return NextResponse.json({message: "Product muvaffaqiyatli ochirildi"});
}


// Create PUT typical and short form
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const { title, price } = await req.json();

	const product = products.find((p) => p.id == +id);

  if (product) {
    product.title = title;
    product.price = price;
  }

  return NextResponse.json({ message: "Product muvaffaqiyatli yangilandi", product });
}