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
import { Product, products } from './lib/data'

export function GET(){
  return NextResponse.json(products)
}

export async function POST(req: Request){
  try{
    const {title, price} = await req.json();

    // 1. Validatsiya: Ma'lumotlar to'liq kelganini tekshiramiz
    if (!title || !price) {
      return NextResponse.json(
        { message: "Nomi (title) va narxi (price) majburiy!" }, 
        { status: 400 }
      );
    }

    // 2. Dublikatni tekshirish: Massivda shunday nomli mahsulot bor-yo'qligini qidiramiz
    // .toLowerCase() qilsak, "Apple" va "apple" ni ham bir xil deb hisoblaydi
    const isExist = products.some(
      (p) => p.title.toLowerCase() === title.trim().toLowerCase()
    );

    if (isExist) {
      return NextResponse.json(
        { message: "Bunday mahsulot allaqachon mavjud! Qayta qo'shish mumkin emas." }, 
        { status: 400 } // 400 Bad Request - noto'g'ri so'rov
      );
    }

    // 3. Agar mavjud bo'lmasa, yangi mahsulotni yaratamiz va qo'shamiz
    const newProduct: Product = {
      id: products.length + 1,
      title: title.trim(), // Ortiqcha bo'shliqlarni olib tashlaymiz
      price
    };

    products.push(newProduct);

    return NextResponse.json({
      message: "New Product Added Successfully", 
      product: newProduct
    }, { status: 201 }); // 201 - Muvaffaqiyatli yaratildi

  } catch(error){
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}