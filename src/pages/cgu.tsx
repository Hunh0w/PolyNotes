import {Box, Container, Typography} from "@mui/material";

export default function CGUPage(){

    return <Container maxWidth={"xl"}>
        <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} paddingX={5} bgcolor={"#B8A7C6"} borderLeft={"4px solid #6D00C7"} borderRight={"4px solid #6D00C7"}>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"}>
                <img src="/img/polybunny.png" width={200} alt={"a polybunny"} />
                <Typography variant="h2"><span style={{ "color": "purple" }}>Poly</span>Notes</Typography>
            </Box>

            <Box my={5} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Typography variant={"h2"}>Conditions générales d'utilisation</Typography>
                <Typography variant={"h3"}>En vigueur au 08/04/2023</Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique
                    des modalités de mise à disposition du site et des services par Font Vincent et de définir les
                    conditions d’accès et d’utilisation des services par « l'Utilisateur ».
                </p>
                <p>
                    Les présentes CGU sont accessibles sur le site à la rubrique «CGU».
                </p>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Toute inscription ou utilisation du site implique l'acceptation sans aucune réserve ni restriction des
                    présentes CGU par l’utilisateur. Lors de l'inscription sur le site via le Formulaire d’inscription, chaque
                    utilisateur accepte expressément les présentes CGU en cochant la case précédant le texte suivant : «
                    Je reconnais avoir lu et compris les CGU et je les accepte ».
                </p>
                <p>
                    En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de renoncer
                    à l'accès des services proposés par le site.
                </p>
                <p>
                    http://162.38.112.154 se réserve le droit de modifier unilatéralement et à tout moment le contenu des
                    présentes CGU.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 1 : Les mentions légales
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    L’édition et la direction de la publication du site http://162.38.112.154 est assurée par Font Vincent,
                    domicilié ********.
                </p>
                <p>
                    Adresse e-mail vincent.font@etu.umontpellier.fr.
                </p>
                <p>
                    L'hébergeur du site http://162.38.112.154 est la société Polytech Montpellier, dont le siège social est
                    situé au Facultés des sciences à Polytech Montpellier.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 2 : Accès au site
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Le site http://162.38.112.154 permet à l'Utilisateur un accès gratuit aux services suivants :<br/>
                    Création et édition de Documents
                </p>
                <p>
                    Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les
                    frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion
                    Internet, etc.) sont à sa charge.
                </p>
                <p>
                    L’Utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s’inscrire en
                    remplissant le formulaire. En acceptant de s’inscrire aux services réservés, l’Utilisateur membre
                    s’engage à fournir des informations sincères et exactes concernant son état civil et ses coordonnées,
                    notamment son adresse email.
                </p>
                <p>
                    Pour accéder aux services, l’Utilisateur doit ensuite s'identifier à l'aide de son identifiant et de son mot
                    de passe qui lui seront communiqués après son inscription.
                </p>
                <p>
                    Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en se
                    rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai raisonnable.
                </p>
                <p>
                    Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site
                    ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n'engage pas
                    la responsabilité de http://162.38.112.154. Dans ces cas, l’Utilisateur accepte ainsi ne pas tenir rigueur
                    à l’éditeur de toute interruption ou suspension de service, même sans préavis.
                </p>
                <p>
                    L'Utilisateur a la possibilité de contacter le site par messagerie électronique à l’adresse email de
                    l’éditeur communiqué à l’ARTICLE 1.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 3 : Collecte des données
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la
                    mesure où il ne collecte aucune donnée concernant les Utilisateurs.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 4 : Propriété intellectuelle
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet
                    d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
                </p>
                <p>
                    L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des
                    différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé,
                    toute utilisation à des fins commerciales et publicitaires est strictement interdite.
                </p>
                <p>
                    Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation
                    expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2
                    et suivants du Code de la propriété intellectuelle.
                </p>
                <p>
                    Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur qui
                    reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 5 : Responsabilité
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Les sources des informations diffusées sur le site http://162.38.112.154 sont réputées fiables mais le
                    site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
                </p>
                <p>
                    Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle.
                </p>
                <p>
                    Malgré des mises à jour régulières, le site http://162.38.112.154 ne peut être tenu responsable de la
                    modification des dispositions administratives et juridiques survenant après la publication. De même, le
                    site ne peut être tenue responsable de l’utilisation et de l’interprétation de l’information contenue dans
                    ce site.
                </p>
                <p>
                    L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle
                    que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de son identifiant et mot de
                    passe. Le site décline toute responsabilité.
                </p>
                <p>
                    Le site http://162.38.112.154 ne peut être tenu pour responsable d’éventuels virus qui pourraient
                    infecter l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à l’accès, ou
                    au téléchargement provenant de ce site.
                </p>
                <p>
                    La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et
                    insurmontable d'un tiers.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 6 : Liens hypertextes
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces
                    liens, il sortira du site http://162.38.112.154. Ce dernier n’a pas de contrôle sur les pages web sur
                    lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 7 : Cookies
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement
                    sur son logiciel de navigation.
                </p>
                <p>
                    Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l’ordinateur de
                    l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site http://162.38.112.154.
                </p>
                <p>
                    Les cookies ne contiennent pas d’information personnelle et ne peuvent pas être utilisés pour identifier
                    quelqu’un. Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains
                    cookies expirent à la fin de la visite de l’Utilisateur, d’autres restent.
                </p>
                <p>
                    L’information contenue dans les cookies est utilisée pour améliorer le site http://162.38.112.154.
                    En naviguant sur le site, L’Utilisateur les accepte.
                </p>
                <p>
                    L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son
                    logiciel de navigation.
                </p>
            </Box>

            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 8 : Publication par l’Utilisateur
                </Typography>
            </Box>

            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    Le site permet aux membres de publier les contenus suivants :
                    Pages.
                </p>
                <p>
                    Dans ses publications, le membre s’engage à respecter les règles de la Netiquette (règles de bonne
                    conduite de l’internet) et les règles de droit en vigueur.
                </p>
                <p>
                    Le site peut exercer une modération sur les publications et se réserve le droit de refuser leur mise en
                    ligne, sans avoir à s’en justifier auprès du membre.
                </p>
                <p>
                    Le membre reste titulaire de l’intégralité de ses droits de propriété intellectuelle. Mais en publiant une
                    publication sur le site, il cède à la société éditrice le droit non exclusif et gratuit de représenter,
                    reproduire, adapter, modifier, diffuser et distribuer sa publication, directement ou par un tiers autorisé,
                    dans le monde entier, sur tout support (numérique ou physique), pour la durée de la propriété
                    intellectuelle. Le Membre cède notamment le droit d'utiliser sa publication sur internet et sur les
                    réseaux de téléphonie mobile.
                </p>
                <p>
                    La société éditrice s'engage à faire figurer le nom du membre à proximité de chaque utilisation de sa
                    publication.
                </p>
                <p>
                    Tout contenu mis en ligne par l'Utilisateur est de sa seule responsabilité. L'Utilisateur s'engage à ne
                    pas mettre en ligne de contenus pouvant porter atteinte aux intérêts de tierces personnes. Tout
                    recours en justice engagé par un tiers lésé contre le site sera pris en charge par l'Utilisateur.
                    Le contenu de l'Utilisateur peut être à tout moment et pour n'importe quelle raison supprimé ou modifié
                    par le site, sans préavis.
                </p>
            </Box>


            <Box mb={4} mt={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    Article 9 : Droit applicable et juridiction compétente
                </Typography>
            </Box>
            <Box mb={2} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"}>
                <p>
                    La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un
                    litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
                </p>
                <p>
                    Pour toute question relative à l’application des présentes CGU, vous pouvez joindre l’éditeur aux
                    coordonnées inscrites à l’ARTICLE 1.
                </p>
            </Box>

            <Typography variant={"h6"}>
                CGU réalisées sur http://legalplace.fr/
            </Typography>
        </Box>
    </Container>
}