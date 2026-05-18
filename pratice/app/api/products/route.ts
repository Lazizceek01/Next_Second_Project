// import { NextResponse } from "next/server";
// import { Product, products } from './lib/data'

// export function GET(){
// 	return NextResponse.json(products)
// }

// export async function POST(req: Request){
// 	try{
// 		const {title, price} = await req.json();
// 		const newProduct: Product = {
// 			id: products.length + 1,
// 			title,
// 			price
// 		};
// 		products.push(newProduct);
// 		return NextResponse.json({
// 			message: "New Product Added Successefully", product: newProduct
// 		});
// 	}catch(error){
// 		console.log(error);
// 		return NextResponse.json({message: "Interval Server Error"})
// 	}
// }


import { NextResponse } from "next/server";
import { Product, products } from './lib/data';

export function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.title || !body.price) {
      return NextResponse.json(
        { message: "Nomi (title) va narxi (price) yuborilishi shart!" },
        { status: 400 }
      );
    }

    const { title, price } = body;
    const isExist = products.some(
      (p) => p?.title?.toLowerCase() === title?.trim()?.toLowerCase()
    );

    if (isExist) {
      return NextResponse.json(
        { message: "Bunday mahsulot allaqachon mavjud!" },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: products.length + 1,
      title: title.trim(),
      price: Number(price)
    };

    products.push(newProduct);

    return NextResponse.json({
      message: "New Product Added Successfully",
      product: newProduct
    }, { status: 201 });

  } catch (error) {
    console.error("POST Xatolik:", error); 
    
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}