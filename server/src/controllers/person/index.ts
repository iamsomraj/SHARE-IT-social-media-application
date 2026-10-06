import type { Request, Response } from 'express';
import { requireUser } from '../../middlewares/auth';
import type {
  LoginInput,
  PaginationQuery,
  RegisterInput,
  SearchInput,
  UuidParams,
} from '../../schemas';
import PersonService from '../../services/Person/PersonService';
import { HTTP_CODES } from '../../utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '../../utils/constants/messages';

/**
 * @description registers a person
 * @route POST /api/v1/persons/
 * @access public
 */
export const registerPerson = async (
  req: Request<Record<string, string>, unknown, RegisterInput>,
  res: Response,
): Promise<void> => {
  const { name, email, password } = req.body;
  const data = await PersonService.registerPerson(name, email, password);

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.REGISTER_SUCCESS,
  });
};

/**
 * @description logs a person in
 * @route POST /api/v1/persons/auth
 * @access public
 */
export const loginPerson = async (
  req: Request<Record<string, string>, unknown, LoginInput>,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;
  const data = await PersonService.loginPerson(email, password);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.LOGIN_SUCCESS,
  });
};

/**
 * @description fetches details of the logged in user
 * @route GET /api/v1/persons/
 * @access private
 */
export const getUserData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = await PersonService.getUserData(requireUser(req));

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.FETCH_USER_DATA_SUCCESS,
  });
};

/**
 * @description fetches details of the person with the given uuid
 * @route GET /api/v1/persons/:uuid
 * @access private
 */
export const getPersonProfile = async (
  req: Request<UuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PersonService.getPersonProfile(req.params.uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.FETCH_PERSON_PROFILE_SUCCESS,
  });
};

/**
 * @description follows a person
 * @route POST /api/v1/persons/follow/:uuid
 * @access private
 */
export const followPerson = async (
  req: Request<UuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PersonService.followPerson(
    requireUser(req),
    req.params.uuid,
  );

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.FOLLOW_SUCCESS,
  });
};

/**
 * @description unfollows a person
 * @route POST /api/v1/persons/unfollow/:uuid
 * @access private
 */
export const unfollowPerson = async (
  req: Request<UuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PersonService.unfollowPerson(
    requireUser(req),
    req.params.uuid,
  );

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.UNFOLLOW_SUCCESS,
  });
};

/**
 * @description fetches people to show on the explore page
 * @route GET /api/v1/persons/people?page=<n>&limit=<n>
 * @access private
 */
export const getPeople = async (req: Request, res: Response): Promise<void> => {
  // `req.query` has been replaced with the parsed value by `validate('query', ...)`.
  const { page, limit } = req.query as unknown as PaginationQuery;
  const data = await PersonService.getPeople(requireUser(req), page, limit);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.FETCH_PEOPLE_SUCCESS,
  });
};

/**
 * @description searches people by name or email
 * @route POST /api/v1/persons/search
 * @access private
 */
export const search = async (
  req: Request<Record<string, string>, unknown, SearchInput>,
  res: Response,
): Promise<void> => {
  const data = await PersonService.search(
    requireUser(req),
    req.body.searchQuery,
  );

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.SEARCH_SUCCESS,
  });
};
