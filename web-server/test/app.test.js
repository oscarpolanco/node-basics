const superTest = require('supertest');
const request = require('request');
const app = require('../src/app');
jest.mock('request');

beforeEach(() => jest.clearAllMocks());

test('Should return a error message if a location is not provide', async () => {
    const response = await superTest(app)
        .get('/weather?address=')
        .send()
        .expect(200);
    
        expect(response.body.error).toEqual('You must provide an address!');
});

test('Should return the unable of connect error message when the location service was unavailable', async () => {
    request.mockImplementation((config, cb) => cb({ error: 'error' }, {}));


    const response = await superTest(app)
        .get('/weather?address=boston')
        .send()
        .expect(200);

    expect(response.body.error).toEqual('Unable to connect to location service!');
});

test('Should return the unable of connect error message when the weather service was unavailable', async () => {
    request.mockImplementationOnce((config, cb) => cb(undefined, {
            body: {
                features: [{
                    center: [-71.058291, 42.360253],
                    place_name: 'Boston, Massachusetts, United States'
                }]
            }})
    )
    .mockImplementationOnce((config, cb) => {
        return cb({ error: 'error' }, {});
    });

    const response = await superTest(app)
        .get('/weather?address=boston')
        .send()
        .expect(200);

    expect(response.body.error).toEqual('Unable to connect to weather service!');
});

test('Should return the unable to find location for a no existing place for the location service', async () => {
    request.mockImplementation((config, cb) => {
        return cb({}, { features: [] })
    });

    const response = await superTest(app)
        .get('/weather?address=foo')
        .send()
        .expect(200);

    expect(response.body.error).toEqual('Unable to connect to location service!');
});

test('Should return the unable to find location for a no existing place for the weather service', async () => {
    request.mockImplementationOnce((config, cb) => {
        return cb(undefined, { body: {features: [{
            center: [-71.058291, 42.360253],
            place_name: 'Boston, Massachusetts, United States'
        }]}});
    })
    .mockImplementationOnce((config, cb) => {
        return cb(undefined, { body: {
            error: 'error'
        }});
    });

    const response = await superTest(app)
        .get('/weather?address=boston')
        .send()
        .expect(200);

    expect(response.body.error).toEqual('Unable to find location');
});

test('Should return the weather information from a valid location', async () => {
    request.mockImplementationOnce((config, cb) => cb(undefined, {
        body: {
            features: [{
                center: [-71.058291, 42.360253],
                place_name: 'Boston, Massachusetts, United States'
            }]
        }})
    )
    .mockImplementationOnce((config, cb) => cb(undefined, {
        body: {
            current: {
                weather_descriptions: [ 'Clear' ],
                temperature: 46,
                feelslike: 43,
                humidity: 49,
            }
        }})
    );

    const response = await superTest(app)
        .get('/weather?address=boston')
        .send()
        .expect(200);

    expect(response.body).toMatchObject({
        forecast: 'Clear. Its is currently 46 degrees out. Its feels like 43 degrees out and the humidity is 49%',
        location: 'Boston, Massachusetts, United States',
        address: 'boston'
    });
});

test('Should response to the about page', async () => {
    const response = await superTest(app)
        .get('/about')
        .send()
        .expect(200);

    expect(response.text).not.toBeNull();
    expect(response.text).toMatchSnapshot();
});

test('Should response to the help page', async () => {
    const response = await superTest(app)
        .get('/help')
        .send()
        .expect(200)

    expect(response.text).not.toBeNull();
    expect(response.text).toMatchSnapshot();
});

test('Should return the 404 page for a not existing route', async () => {
    const response = await superTest(app)
        .get('/foo')
        .send()
        .expect(200);

    expect(response.text).not.toBeNull();
    expect(response.text).toMatchSnapshot();
});
