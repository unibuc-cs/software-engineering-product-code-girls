describe('Admin Login, Add Category, Add Book', () => {
    let authToken;
    let categoryId;

    it('1. Login as admin', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/users/login',
            body: {
                name: 'Admin',
                password: 'admin123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.eq('Login successful');
            expect(response.body.accessToken).to.exist;

            authToken = response.body.accessToken;
        });
    });

    it('2. Add a new book category', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/categories',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: {
                name: 'Romance',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include('The category was added to the database');

            // Fetch categories to get category ID
            cy.request({
                method: 'GET',
                url: 'http://localhost:8081/categories',
            }).then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                expect(getResponse.body.length).to.be.greaterThan(0);

                categoryId = getResponse.body.find(cat => cat.name === 'Romance')?.id;
                expect(categoryId).to.exist;
            });
        });
    });

    it('3. Add a new book', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/books',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: {
                title: 'Love in Paris',
                author: 'Jane Doe',
                category_id: categoryId,  // Ensure category_id is included
                description: 'A romantic journey through the city of love.',
                cover_image: "C:\\FACULTATE\\IS2\\software-engineering-product-code-girls\\backend\\uploads\\1737917788473.jpeg"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include('The book was added to the database');
        });
    });
});
