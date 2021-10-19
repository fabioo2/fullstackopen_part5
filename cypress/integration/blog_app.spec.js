describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const userOne = {
            name: 'Fabio Kim',
            username: 'fabio',
            password: 'tonyromo',
        };
        const userTwo = {
            name: 'Haemin Park',
            username: 'haemin',
            password: 'tonyromo',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', userOne);
        cy.request('POST', 'http://localhost:3003/api/users/', userTwo);
        cy.visit('http://localhost:3000');
    });

    it('login form is shown', function () {
        cy.get('#loginForm').should('exist');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('fabio');
            cy.get('#password').type('tonyromo');
            cy.get('#login-button').click();

            cy.contains('Fabio Kim is logged in');
            cy.get('#logout-button').click();
        });
        it('fails with wrong credentials', function () {
            cy.get('#username').type('fabio');
            cy.get('#password').type('tonyromo22');
            cy.get('#login-button').click();

            cy.get('#message').should('have.css', 'color', 'rgb(255, 0, 0)');
        });
    });

    describe('When Logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'fabio', password: 'tonyromo' });
        });
        it('A blog can be created', function () {
            cy.createBlog({
                url: 'test.ca',
                title: 'this is a test blog created by cypress',
            });
            cy.contains('this is a test blog');
        });
    });

    describe('Blogs can be liked, deleted, sorted', function () {
        beforeEach(function () {
            cy.login({ username: 'fabio', password: 'tonyromo' });
            cy.createBlog({
                url: 'test.ca',
                title: 'this is a test blog created by cypress',
            });
        });
        it('A blog can be liked', function () {
            cy.contains('this is a test blog created by cypress').parent().contains('show').click();
            cy.contains('this is a test blog created by cypress').parent().find('#like-button').click();
            cy.contains('likes: 1');
        });

        it('A blog can be deleted', function () {
            cy.contains('this is a test blog created by cypress').parent().contains('show').click();
            cy.contains('this is a test blog created by cypress').parent().contains('delete').click();
            cy.contains('this is a test blog created by cypress').should('not.exist');
        });
        it('delete button is not visible for blogs not created by currently logged in user', function () {
            cy.get('#logout-button').click();
            cy.login({ username: 'haemin', password: 'tonyromo' });
            cy.contains('this is a test blog created by cypress').parent().contains('show').click();
            cy.contains('this is a test blog created by cypress').parent().contains('delete').should('have.css', 'display', 'none');
        });
    });
    describe('Blogs can be liked', function () {
        beforeEach(function () {
            cy.login({ username: 'fabio', password: 'tonyromo' });
            cy.createBlog({
                url: 'test.ca',
                title: 'this is a blog one',
            });
            cy.createBlog({
                url: 'test.ca',
                title: 'this is a blog two',
            });
            cy.createBlog({
                url: 'test.ca',
                title: 'this is a blog three',
            });
        });
        it('and sorted by number of likes', function () {
            cy.contains('this is a blog two').parent().contains('show').click();
            cy.contains('this is a blog two').parent().find('#like-button').click();
            cy.contains('this is a blog two').parent().contains('likes: 1');

            cy.contains('this is a blog two').parent().find('#like-button').click();
            cy.contains('this is a blog two').parent().contains('likes: 2');

            cy.contains('this is a blog two').parent().find('#like-button').click();
            cy.contains('this is a blog two').parent().contains('likes: 3');

            cy.contains('this is a blog two').parent().find('#like-button').click();
            cy.contains('this is a blog two').parent().contains('likes: 4');

            cy.contains('this is a blog one').parent().contains('show').click();

            cy.contains('this is a blog one').parent().find('#like-button').click();
            cy.contains('this is a blog one').parent().contains('likes: 1');
            cy.contains('this is a blog one').parent().find('#like-button').click();
            cy.contains('this is a blog one').parent().contains('likes: 2');

            cy.reload();
            cy.get('.blog')
                .should('have.length', 3)
                .each(($el, index) => {
                    const html = $el.html();
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = html;
                    const likes = wrapper.getElementsByClassName('likes-label')[0];
                    console.log(likes.innerText);
                    if (index === 0 && likes.innerText.trim() !== 'likes: 4') {
                        throw new Error('test fails');
                    } else if (index === 1 && likes.innerText.trim() !== 'likes: 2') {
                        throw new Error('test fails');
                    } else if (index === 2 && likes.innerText.trim() !== 'likes: 0') {
                        throw new Error('test fails');
                    }
                });
        });
    });
});
