describe('POST /', () => {
    it('should create a new user when given valid input', () => {
        const userData = {user: 'test_user', password: 'password', email: 'test@example.com'};
        const expectedResponse = {message: 'User Registered'};

        // Set up a mock request and response object
        const req = {body: userData};
        const res = {
            send: jest.fn().mockResolvedValue(expectedResponse),
        };

        // Set up a mock for the User model's `findOne` method
        User.findOne = jest.fn().mockResolvedValue(null);

        // Set up a mock for the new user object's `save` method
        const saveMock = jest.fn().mockResolvedValue();
        const newUserMock = {save: saveMock};
        User.mockImplementation(() => newUserMock);

        // Call the route handler
        return router
            .route('/')
            .post(req, res)
            .then(() => {
                // Assert that the correct response was sent
                expect(res.send).toHaveBeenCalledWith(expectedResponse);

                // Assert that the `findOne` method was called with the correct arguments
                expect(User.findOne).toHaveBeenCalledWith({user: 'test_user'});

                // Assert that the `save` method was called on the new user object
                expect(saveMock).toHaveBeenCalled();

                // Assert that the new user object was constructed with the correct data
                expect(User).toHaveBeenCalledWith({
                    user: 'test_user',
                    password: 'password',
                    email: 'test@example.com',
                    calendar: [],
                });
            });
    });

    it('should return an error if the user already exists', () => {
        const userData = {user: 'test_user', password: 'password', email: 'test@example.com'};
        const expectedResponse = {
            message: 'user already registered',
            user: 'test_user',
            calendar: 0,
        };

        // Set up a mock request and response object
        const req = {body: userData};
        const res = {
            send: jest.fn().mockResolvedValue(expectedResponse),
        };

        // Set up a mock for the User model's `findOne` method
        User.findOne = jest.fn().mockResolvedValue({user: 'test_user', calendar: []});

        // Call the route handler
        return router
            .route('/')
            .post(req, res)
            .then(() => {
                // Assert that the correct response was sent
                expect(res.send).toHaveBeenCalledWith(expectedResponse);

                // Assert that the `findOne` method was called with the correct arguments
                expect(User.findOne).toHaveBeenCalledWith({user: 'test_user'});
            });
    });
});
