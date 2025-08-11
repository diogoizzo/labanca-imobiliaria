**Padrões que precisam sempre serem seguidos**

-   Sempre pense em quebrar um componente grande em componentes menores.
-   Os componentes deve ser salvos em src/components.
-   Use higher order components para fazer data fetch no servidor e client components para interatividade.
-   Estamos usando a abordagem de api do nextjs e o @tanstack/react-query para tudo, voce deve sempre prensar no revalidate e nas mutações com essa lib.
-   As mutações do react query devem fazer uso de services para cada um das ações possíveis, e esse services devem ser criados e armazenados em src/services.
-   Sempre verifique se um service já existe antes de criar.
-   Cada service deve realizar apenas uma ação, chamando a rota de api correspondente.
-   As rotas de apis devem ficar em src/app/api conforme o padrão do nextjs, e, em geral, devem verificar se o usuário está logado. Essa regra pode ter exceções, se for expressamente solicitado.
-   Sempre verifique se uma rota de api com a finalidade desejada já existe, antes de criar uma nova.
-   Sempre que for instalar um novo pacote ou lib use --legacy-peer-deps.
-   Todas as interfaces do sistema fica em src/interfaces e você deve ler os arquivos dessa pasta, sempre que for trabalhar com algum tipo de dado personalizado do sistema.
-   Sempre que for fazer qualquer funcionalidade de loading use o componente src/components/admin/LoadingSpinner.tsx
