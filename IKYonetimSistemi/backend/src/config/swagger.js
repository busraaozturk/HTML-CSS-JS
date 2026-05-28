import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",   // OpenAPI - Swagger sürümü
        info: { // API hakkında temel bilgiler
            title: "IK Yönetim Sistemi API",
            version: "1.0.0",
            description: "IK Yönetim Sistemi için RESTful API dokümantasyonu",
        },
        servers: [  // Backend sunucusunun adresi
            {
                url: "http://localhost:5001",
                description: "Local server",
            }
        ],
    },
    apis: ["./src/controllers/*.js"], 
    // API dokümantasyonu için controller dosyalarını tarıyoruz
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;