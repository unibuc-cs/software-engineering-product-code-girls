describe('User Flow: Register, Login, Write Review, Add and fetch all Comments', () => {
  let authToken;
  let bookId = 42;

  it('1. Register a new user', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/users/register',
      body: {
        name: 'TestDariaQ',
        password: 'testpassword123'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.success).to.be.true;
      expect(response.body.message).to.eq('Account created successfully!');
    });
  });

  it('2. Login with the registered user', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/users/login',
      body: {
        name: 'TestDariaQ',
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

  it('3. Write a review for a book', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8081/reviews',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: {
        book_id: bookId,
        rating: 5
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.eq('Review added successfully!');
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
  
  
  it('5. Fetch comments for the book', () => {
    cy.request({
      method: 'GET',
      url: `http://localhost:8081/comments/${bookId}`
    }).then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(getResponse.body.length).to.be.greaterThan(0);
    });
  });
});
