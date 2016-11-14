import fetch from 'isomorphic-fetch';
import _ from 'lodash';

const URI_DATA = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

export default (req, res) => {
    let data = {};
    const reqAPI = req;
    const resAPI = res;

    const getData = fetch(URI_DATA)
        .then(async (res) => {
            data = await res.json();

            return data;
        })
        .then((data) => {
            const PATTERN_PATH_SEPARATOR = /\//i;
            const pathArray = reqAPI.params[0].split(PATTERN_PATH_SEPARATOR).filter((param) => {
                return param.length;
            });

            if (pathArray[0] === 'volumes') {
                let result = {};

                data.hdd.forEach((hard) => {
                    if (result.hasOwnProperty(hard.volume)) {
                        result[hard.volume] += hard.size;
                    } else {
                        result[hard.volume] = hard.size;
                    }
                });

                for (let hard in result) {
                    result[hard] += 'B';
                }

                resAPI.json(result);
            } else {
                let i = 0;
                let result = data;
                let failPath = false;

                while (pathArray[i]) {
                    if (
                        _.isPlainObject(result) && result.hasOwnProperty(pathArray[i]) ||
                        _.isArray(result) && Number(pathArray[i]) >= 0 && _.nth(result, pathArray[i]) !== undefined
                    ) {
                        result = result[pathArray[i]];

                        i++;
                    } else {
                        failPath = true;

                        break;
                    }
                }

                if (failPath) {
                    resAPI
                        .status(404)
                        .send('Not Found');
                } else {
                    resAPI.json(result);
                }
            }
        })
        .catch(err => {
            console.log(`Could not synchronize data with "${URI_DATA}".`, err);

            res
                .status(500)
                .send('Oops!');
        });
};
