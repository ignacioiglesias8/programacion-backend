export const generateProductErrorInfo = (product) => {
	return `Error al generar producto. 
	Algo de esto faltó: ${product.title} 
	${product.description} 
	${product.price} 
	${product.code} 
	${product.stock} 
	${product.category}`;
}
