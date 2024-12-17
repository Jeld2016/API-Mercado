export interface MenuItem{
    label: string,
    icon:string
}

export interface Producto{
    title: string,
    price: number,
    category: string,
    sku: string,
    atributos: string,
    vendor:string,
    description:string,
    image:string,
    prime: boolean,
    availability: boolean,
    diasDisponibilidad: number
}

export interface masivo{
    asin: string,
    prime:boolean
}