import fetch from 'node-fetch';

const apiServerAddress =
  process.env.API_SERVER_ADDRESS || 'http://localhost:8081';

const NDID_API_CALLBACK_IP = process.env.NDID_API_CALLBACK_IP || 'localhost';
const NDID_API_CALLBACK_PORT = process.env.NDID_API_CALLBACK_PORT || 5002

export async function registerAccessorCallback(url) {
  try {
    const response = await fetch(`${apiServerAddress}/idp/accessor/callback`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
      }),
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 500) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    // let responseJson = await response.json();

    // return responseJson;
    return;
  } catch (error) {
    throw error;
  }
}

export const getCallbackUrls = async () => {
  try {
    const response = await fetch(`${apiServerAddress}/idp/callback`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 500) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    let responseJson = await response.json();

    return responseJson;
  } catch (error) {
    throw error;
  }
};

export const setCallbackUrls = async ({
  incoming_request_url,
  identity_result_url,
  accessor_sign_url,
  error_url,
}) => {
  try {
    const response = await fetch(`${apiServerAddress}/idp/callback`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incoming_request_url,
        identity_result_url,
        accessor_sign_url,
        error_url,
      }),
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 500) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    // let responseJson = await response.json();

    // return responseJson;
    return;
  } catch (error) {
    throw error;
  }
};

export const createIdpResponse = async ({
  request_id,
  namespace,
  identifier,
  ial,
  aal,
  secret,
  status,
  signature,
  accessor_id,
  callback_url,
}) => {
  try {
    const response = await fetch(`${apiServerAddress}/idp/response`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_id,
        namespace,
        identifier,
        ial,
        aal,
        secret,
        status,
        signature,
        accessor_id,
        callback_url,
      }),
    });

    if (!response.ok) {
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 403
      ) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    // let responseJson = await response.json();

    // return responseJson;
  } catch (error) {
    throw error;
  }
};

export async function createNewIdentity(data) {
  try {
    const response = await fetch(`${apiServerAddress}/identity`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 403
      ) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    let tmp = await response.json();
    return tmp;
  } catch (error) {
    throw error;
  }
}

export async function addAccessor(data) {
  try {
    const response = await fetch(`${apiServerAddress}/identity/${data.namespace}/${data.identifier}/accessors`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 403
      ) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    let tmp = await response.json();
    return tmp;
  } catch (error) {
    throw error;
  }
}

export const setDpkiCallbackUrl = async ({ sign_url, decrypt_url }) => {
  try {
    const response = await fetch(
      `${apiServerAddress}/dpki/node/register_callback`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sign_url,
          decrypt_url,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 400 || response.status === 500) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    // let responseJson = await response.json();

    // return responseJson;
    return;
  } catch (error) {
    throw error;
  }
};

export const setDpkiCallbackUrlMaster = async ({ url }) => {
  try {
    const response = await fetch(
      `${apiServerAddress}/dpki/node/register_callback_master`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 400 || response.status === 500) {
        const errorJson = await response.json();
        throw errorJson;
      }
      throw response;
    }

    // let responseJson = await response.json();

    // return responseJson;
    return;
  } catch (error) {
    throw error;
  }
};
