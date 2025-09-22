import { databaseService } from './database.service';
import { QuablePimClient } from '@quable/quable-pim-js';
class AppService {
  public checkAuthToken = async (instanceName: string, authToken: string) => {
    try {
      const quableClient = new QuablePimClient({ apiKey: authToken, instanceName })
      await quableClient.PimApi.User.getAll({ limit: 1, type: 'api' });
      return true;
    } catch (error) {
      return false;
    }
  };

  public installApp = async (payload: Record<string, any>) => {
    const response = {
      statusCode: 201,
      message: 'OK',
      data: null,
    };

    try {
      const { quableInstanceName, quableAuthToken } = payload.data;

      if (!(await this.checkAuthToken(quableInstanceName, quableAuthToken))) {
        response.statusCode = 500;
        response.message =
          'QuableApp could not be installed on your PIM. Please check your information and try again.';
        return response;
      }

      let instance = await databaseService.quableInstance.findFirst({
        where: { name: quableInstanceName },
      });

      const instanceData = {
        authToken: quableAuthToken,
        name: quableInstanceName,
      };

      instance = instance
        ? await databaseService.quableInstance.update({
          where: { id: instance.id },
          data: instanceData,
        })
        : await databaseService.quableInstance.create({ data: instanceData });

      response.message = `QuableApp installed on ${instance.name}.quable.com`;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      console.log(response);
    }

    return response;
  };

  public launchDocumentApp = async (payload: Record<string, any>) => {
    const response = { statusCode: 200, message: 'OK', url: '', err: 0 };

    try {
      const { quableInstanceName, dataLocale, interfaceLocale, userId } =
        payload.data;

      response.url = `${process.env.QUABLE_APP_HOST_URL}?quableInstanceName=${quableInstanceName}&dataLocale=${dataLocale}&interfaceLocale=${interfaceLocale}&userId=${userId}`;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      response.err = 1;
    }

    return response;
  };
}

export const appService = new AppService();
