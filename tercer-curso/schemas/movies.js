const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string'
  }).min(1, { message: 'Title is required' }),
  year: z.number().int(),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).optional(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller']),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie (movie) {
  return movieSchema.safeParse(movie)
}

function validatePartialMovie (movie) {
  return movieSchema.partial().safeParse(movie)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
