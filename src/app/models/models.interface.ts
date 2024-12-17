export interface MenuItem{
    label: string,
    icon:string
}

export interface Resultado{
    scroll_id: string,
    productos: Producto []
}

export interface Producto{
    id?:string,
    ID_product?: string,
    title: string,
    price:number,
    vendor:string,
    description:string,
    image:string[],
    sku?: string,
    availability?: string,
    category_id?: string
    status?: string,
    dias_entrega?: number
}