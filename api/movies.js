import express from 'express';
import movie from '../models/moviestable.js';
const router = express.Router();


// router.get('/hi', async(request, response) => {
//     return response.json({
//        massage: 'hi tom'
//     })
// });


router.post('/addnewmovie', async(request, response) => {

    const { moviename, moviedescription, movieimage, moviegenre, movielength, rate, year, director } = request.body;

    movie.create({
        moviename: moviename,
        moviedescription: moviedescription,
        movieimage: movieimage,
        moviegenre: moviegenre,
        movielength: movielength,
        rate: rate,
        year: year,
        director: director
    })
    .then(movie_create => {
        return response.status(200).json({
            status: true,
            movies: movie_create
        })
    })
    .catch(error => {
        return response.status(500).json({
            massage: error.massage
        });
    })

});

router.get('/getallmovies', async(request, response) => {
    movie.findAll()
    .then(result => {
        return response.status(200).json({
            users: result
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
});

router.get('/getmoviebygenre/:genre', async(request, response) => {

    const moviegenre = request.params.genre;
    
    movie.findAll({where: {moviegenre: moviegenre}})
    .then(results => {
        return response.status(200).json({
            status: true,
            results: results
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
});

router.get('/getmoviebyid/:movieid', async(request, response) => {
    
    const movieid = request.params.movieid;
    
    movie.findByPk(movieid)
    .then(account => {
        return response.status(200).json({
            status: true,
            account: account
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
});

router.put('/updatamovie', async(request, response) => {

    const { id, moviename, moviedescription, movieimage} = request.body;

    movie.findByPk(id)
    .then(async account => {

        account.moviename = moviename
        account.moviedescription = moviedescription
        account.movieimage = movieimage
        account.save()

        .then(updatemovie => {
            return response.status(200).json({
                status: true,
                updatemovie: updatemovie
            })
        })
        .catch(error => {
            return response.status(500).json({
                status: false,
                massage: error.massage
            })
        })
        
    })
    .catch(error => {
        return response.status(400).json({
            status: false,
            massage: error.massage
        })
    })
    
});

router.delete('/removemoviebyid/:deletmovie', async(request, response) => {
    
    const deletid = request.params.deletmovie

    movie.findByPk(deletid)
    .then(movie => {
        movie.destroy();
        return response.status(200).json({
            status: true,
            movie: movie
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
});



export default router;