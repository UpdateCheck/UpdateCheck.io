<?php namespace UpdateCheck\Http\Controllers;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use UpdateCheck\User;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function auth()
    {
        // grab credentials from the request
        $credentials = [
            'email' => \Input::json('email'),
            'password' => \Input::json('password')
        ];

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }

            $user = User::where('email', $credentials['email'])->first();
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token', 'user'));
    }

    public function store()
    {
        $input = \Input::json()->all();

        $user = User::create([
            'first_name' => $input['firstName'],
            'last_name' => $input['lastName'],
            'email' => $input['email'],
            'password' => \Hash::make($input['password'])
        ]);

        return \Response::json($user, 201);
    }
}