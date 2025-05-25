export default {
    list: async () => {
        const customers = [
            { id: 1, name: "John Doe", email: "john@doe.com" },
            { id: 2, name: "Jane Doe", email: "jane@doe.com" },
            { id: 3, name: "Jim Doe", email: "jim@doe.com" },
        ]

        return customers;
    },
    create: async ({ body }: { 
        body: { 
            id: number, 
            name: string, 
            email: string 
        } 
    }) => {
        return body;
    },
    update: async ({ body, params }: { 
        body: { 
            id: number, 
            name: string, 
            email: string 
        },
        params: { id: number }
    }) => {
        return { body: body, params: params.id };
    },
    delete: async ({ params }: { 
        params: { id: number } 
    }) => {
        return { params: params.id };
    }
}