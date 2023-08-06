import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginaitedDto } from '../dto/paginated.dto';

interface IPaginationDecoratorApiResponse {
  model: Type<any>;
  description?: string;
}

export const ApiPaginationResponse = (
  options: IPaginationDecoratorApiResponse,
) => {
  return applyDecorators(
    ApiExtraModels(PaginaitedDto),
    ApiOkResponse({
      description: options.description || 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginaitedDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(options.model) },
              },
              meta: {
                type: 'any',
                default: {
                  totalItems: 2,
                  itemsCount: 2,
                  itemsPerPage: 2,
                  totalPages: 1,
                  currentPage: 1,
                },
              },
            },
          },
        ],
      },
    }),
  );
};
