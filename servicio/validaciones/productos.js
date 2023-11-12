import Joi from'joi'

export const validar = producto => {
    const productoSchema = Joi.object({
        nombre: Joi.string().alphanum().required(),  // permite string alfanumerico
        precio: Joi.number().min(0).max(1000000).required(), //numero mayor a 0 y menor a 1000000
        stock: Joi.number().integer().min(0).max(1000000).required(), //numero decimal mayor a 0 y menor a 1000000
    })

    const { error } = productoSchema.validate(producto)
    if (error) {
        return { result: false, error }
    }
    return { result: true }
}