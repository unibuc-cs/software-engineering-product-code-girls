describe('User Flow: Add Book to ReadMe, Comment, and Mark as Read', () => {
    let authToken;
    let userId = 79;
    let bookId = 40; 

    it('1. Login as a user', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/users/login',
            body: {
                name: 'TestDaria2',
                password: 'testpassword123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
            expect(response.body.message).to.eq('Login successful');
            expect(response.body.accessToken).to.exist;

            authToken = response.body.accessToken;
        });
    });

    it('2. Add a book to ReadMe list', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/library/add',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: {
                user_id: userId,
                book_id: bookId
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('3. Add a comment to a book', () => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:8081/comments',
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          body: {
            book_id: bookId, 
            content: 'This book is fantastic! Highly recommend it.'
          }
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.eq('Comment added successfully!');
        });
      });
      

    it('4. Move the book to "Read"', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8081/library/mark-as-read/${userId}/${bookId}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Book marked as read successfully!');
        });
    });
});
