// Todo o texto do site vive aqui. Nenhuma string de copy deve ser
// hardcoded em componentes ou páginas — edite este arquivo para
// alterar qualquer conteúdo visível do site.

export const nav = {
  links: [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Quem somos" },
    { href: "/metodologia", label: "Metodologia" },
    { href: "/modalidades", label: "Modalidades" },
    { href: "/resultados", label: "Resultados" },
    { href: "/faq", label: "FAQ" },
  ],
  cta: "Agendar diagnóstico",
} as const;

export const brand = {
  wordmark: "SNOW WISON",
  wordmarkSuffix: "IDIOMAS",
} as const;

export const footer = {
  tagline: "Snow Wison Idiomas — Ensino de inglês 100% online e ao vivo",
  navTitle: "Navegação",
  contactTitle: "Contato",
  // CNPJ, Política de Privacidade e Termos de Uso: aguardando dados do cliente.
  // Não preencher com valores inventados — ver PENDENCIAS.md.
} as const;

export const a11y = {
  skipLink: "Pular para o conteúdo principal",
  whatsappAria: "Falar com a Snow Wison pelo WhatsApp",
  whatsappDisabledTitle:
    "Número de WhatsApp ainda não configurado para este site.",
} as const;

export const home = {
  hero: {
    headline: "Construindo a ponte entre você e seus maiores sonhos.",
    summary:
      "Escola premium de inglês, 100% online e ao vivo — com conteúdo estruturado e aplicação personalizada para o objetivo de cada aluno.",
    ctaPrimary: "Agendar diagnóstico",
    ctaSecondary: "Conhecer a Snow Wison",
  },
  filosofia: {
    eyebrow: "Estrutura e aplicação",
    heading: "Nem todo objetivo pede o mesmo percurso.",
    statement:
      "Todo aluno recebe a mesma estrutura de conteúdo. Nenhum recebe o mesmo caminho.",
    paragraph:
      "Existe uma estrutura de conteúdo, e ela é a mesma para todos. O que muda é a forma como ela chega até você: o ritmo, o foco e os recursos que o professor escolhe usar.",
    equation: [
      { title: "Conteúdo estruturado", note: "a base: o mesmo para todos" },
      {
        title: "Aplicação personalizada",
        note: "o caminho: único para cada aluno",
      },
    ],
    result: "Experiência Snow Wison",
  },
  problema: {
    eyebrow: "O problema",
    heading: "Por que não consegui aprender até agora?",
    subheading: "Talvez o caminho nunca tenha sido pensado para o seu objetivo.",
    items: [
      "Estudar sem saber exatamente onde precisa chegar",
      "Entender tudo na leitura e travar na hora de falar",
      "Acumular conteúdo sem conseguir usar no dia a dia",
      "Seguir o mesmo ritmo que todos os outros alunos",
      "Sentir que está avançando no material, mas não no inglês",
    ],
  },
  solucao: {
    eyebrow: "A solução",
    heading: "É aqui que a Snow Wison entra.",
    steps: [
      {
        number: "01",
        title: "Objetivo",
        description: "Entendemos onde você quer chegar.",
      },
      {
        number: "02",
        title: "Diagnóstico",
        description: "Identificamos seu momento atual e suas necessidades.",
      },
      {
        number: "03",
        title: "Estrutura",
        description: "Definimos o conteúdo necessário para sua evolução.",
      },
      {
        number: "04",
        title: "Aplicação",
        description: "O professor adapta a forma de trabalhar o conteúdo.",
      },
      {
        number: "05",
        title: "Acompanhamento",
        description: "Sua evolução é acompanhada ao longo do processo.",
      },
    ],
  },
  comoFunciona: {
    eyebrow: "Como funciona",
    heading: "Do contato ao resultado.",
    support:
      "Antes de qualquer aula, existe uma etapa de entendimento. Você não compra um pacote — você define um objetivo, e a partir dele construímos o caminho.",
    steps: [
      "Você entra em contato.",
      "Conversamos sobre seus objetivos.",
      "Realizamos uma reunião e diagnóstico.",
      "Definimos o caminho mais adequado.",
      "Você começa suas aulas.",
      "Acompanhamos sua evolução.",
    ],
  },
  atmospheric: {
    line1: "Cada aluno chega de um jeito.",
    line2: "O cuidado com o caminho é sempre o mesmo.",
  },
  modalidadesTeaser: {
    eyebrow: "Modalidades",
    heading: "Quatro formatos. Um mesmo padrão de exigência.",
    note: "A diferença entre elas está na experiência e no nível de personalização — não na qualidade do conteúdo.",
    items: [
      { tag: "Experiência Premium", name: "Individual" },
      { tag: "Experiência Plus", name: "Dupla" },
      { tag: "Experiência Economic", name: "Grupo" },
      { tag: "Experiência Específica", name: "Unique" },
    ],
    cta: "Conhecer",
  },
  finalCta: {
    headingLine1: "Você define onde quer chegar.",
    headingLine2: "Nós estruturamos o caminho.",
    paragraph:
      "Converse com a Snow Wison e descubra qual experiência faz sentido para o seu objetivo.",
    cta: "Agendar diagnóstico",
    microcopy: "Fale com nossa equipe pelo WhatsApp.",
  },
} as const;

export const sobre = {
  intro: {
    heading: "Uma escola construída em torno do objetivo do aluno.",
    paragraph:
      "A Snow Wison é uma escola premium de inglês, 100% online e ao vivo. Em vez de oferecer um curso padrão, construímos cada percurso a partir de um objetivo real — viagem, carreira, exame ou simplesmente comunicação.",
  },
  quemSomos: {
    eyebrow: "Quem somos",
    heading: "Uma escola nova, com um padrão exigente desde o início.",
    paragraph:
      "Somos uma escola premium de inglês com cerca de um ano de mercado, guiada por um propósito simples: resultado, não volume de conteúdo. O aluno não é avaliado por quanto estudou, mas por quanto avançou em direção ao que definiu como objetivo. O ensino é 100% online e sempre ao vivo — nunca apenas gravado. Atendemos alunos em três formatos: individual, em dupla e em grupo.",
  },
  oQueFazemos: {
    eyebrow: "O que fazemos",
    heading: "Conteúdo estruturado. Aplicação personalizada.",
    paragraph:
      "Existe uma base de conteúdo comum a todos os alunos, desenvolvida com referências em princípios de neurociência do aprendizado e em abordagens educacionais associadas a instituições e editoras de referência, como Harvard, Oxford e Macmillan. O que muda é como essa base é aplicada em cada aula: se um aluno tem mais facilidade com estímulos visuais, por exemplo, o professor pode usar mais imagens, vídeos e esquemas na forma de trabalhar o mesmo conteúdo. Para objetivos específicos, urgências ou prazos curtos, existe também o Unique — uma experiência à parte, fora dessa estrutura padrão.",
  },
  objetivos: {
    heading: "Qual é o seu próximo objetivo?",
    items: [
      "Viagens",
      "Carreira",
      "Trabalho",
      "Exames e provas",
      "Morar no exterior",
      "Comunicação",
      "Aprendizado acelerado",
      "Objetivos específicos",
    ],
    note: "Para alguns desses objetivos — como viagens ou preparação gramatical — a Snow Wison conta com programas próprios, com materiais específicos desenvolvidos para aquele foco.",
  },
  provaSocial: {
    number: "+50",
    label: "alunos atendidos",
    cta: "Ver resultados",
  },
} as const;

export const metodologia = {
  intro: {
    heading: "Estrutura não é engessamento.",
    paragraph:
      "Ter uma base de conteúdo definida não significa tratar todos os alunos da mesma forma. Significa garantir que a evolução de cada aluno esteja apoiada em uma base lógica — para então ser aplicada de um jeito único.",
  },
  base: {
    eyebrow: "Base de aprendizagem",
    heading: "Princípios que guiam cada aula.",
    items: [
      {
        title: "Prática ativa",
        description: "O aluno usa o idioma desde o início — não apenas estuda regras sobre ele.",
      },
      {
        title: "Progressão estruturada",
        description: "Cada etapa constrói sobre a anterior, em vez de saltos aleatórios de conteúdo.",
      },
      {
        title: "Aplicação contextual",
        description: "O conteúdo é trabalhado dentro de situações reais ligadas ao objetivo do aluno.",
      },
      {
        title: "Acompanhamento contínuo",
        description: "A evolução é observada ao longo do processo, não apenas no início.",
      },
    ],
  },
  referencias: {
    eyebrow: "Referências institucionais",
    heading: "De onde vêm nossas referências.",
    paragraph:
      "Conteúdo e metodologia desenvolvidos com referências em princípios de aprendizagem e abordagens educacionais associadas a instituições e editoras de referência, como Harvard, Oxford e Macmillan.",
  },
  professores: {
    eyebrow: "Professores",
    heading: "Quem ensina também precisa estar preparado.",
    paragraph:
      "A Snow Wison trabalha apenas com professores que apresentem alguma das seguintes qualificações. Além disso, todos passam por um treinamento interno, alinhado à metodologia da escola, para otimizar os resultados de cada aluno.",
    criteriaLabel: "Exigência mínima — uma destas:",
    criteria: [
      "Graduação",
      "Mestrado",
      "Experiência comprovada",
      "Certificações internacionais",
    ],
  },
} as const;

export const modalidades = {
  intro: {
    heading: "Como você aprende também faz parte do caminho.",
    paragraph:
      "Individual, Dupla e Grupo compartilham a mesma estrutura de conteúdo — o que muda entre elas é o formato e o nível de personalização. O Unique é a exceção: uma experiência à parte, para quando o objetivo pede outro tipo de conteúdo.",
  },
  blocks: [
    {
      id: "individual",
      tag: "Experiência Premium",
      name: "Individual",
      paragraph:
        "A experiência mais personalizada da Snow Wison. O ritmo, o foco e a forma de aplicação do conteúdo são construídos em torno de um único aluno.",
      features: [
        "Aulas individuais",
        "Acompanhamento próximo",
        "Plano de estudos",
        "Aplicação personalizada",
        "Adaptação conforme características e preferências do aluno",
        "Foco específico nos objetivos",
      ],
      cta: "Conhecer o Premium",
    },
    {
      id: "dupla",
      tag: "Experiência Plus",
      name: "Dupla",
      paragraph:
        "Uma experiência de aprendizagem em dupla, combinando interação, acompanhamento e estrutura.",
      features: [
        "Aulas em dupla",
        "Interação entre colegas",
        "Acompanhamento estruturado",
        "Mesmo padrão de conteúdo da Snow Wison",
      ],
      cta: "Conhecer o Plus",
    },
    {
      id: "grupo",
      tag: "Experiência Economic",
      name: "Grupo",
      paragraph:
        "Uma experiência estruturada para quem deseja desenvolver o inglês em um ambiente colaborativo, mantendo o mesmo padrão de conteúdo de Individual e Dupla.",
      features: [
        "Ambiente colaborativo",
        "Mesmo padrão de conteúdo de Individual e Dupla",
        "Estrutura consistente de aprendizagem",
      ],
      cta: "Conhecer o Economic",
    },
    {
      id: "unique",
      tag: "Experiência Específica",
      name: "Unique",
      paragraph:
        "A exceção entre as modalidades Snow Wison. Criada para objetivos específicos, urgências e programas de curto prazo, com conteúdo próprio — fora da estrutura padrão das demais experiências.",
      features: [
        "Foco em objetivo específico",
        "Atendimento a demandas urgentes",
        "Programas de curto prazo",
        "Conteúdo e material próprios para o objetivo",
      ],
      cta: "Conhecer o Unique",
    },
  ],
  premiumDestaque: {
    eyebrow: "Destaque Premium",
    heading: "Quando o objetivo exige um caminho próprio.",
    paragraph:
      "No Premium, o professor avalia as características do aluno e faz uma leitura do seu perfil para definir qual abordagem traz mais resultados.",
    criteria: [
      "Características",
      "Preferências",
      "Necessidades",
      "Objetivos",
      "Evolução",
    ],
  },
} as const;

export const resultados = {
  intro: {
    heading: "Resultado não é promessa. É percurso.",
    paragraph:
      "Os números e depoimentos abaixo refletem o que já foi construído com nossos alunos — e o que ainda está em construção.",
  },
  numero: {
    value: "+50",
    label: "alunos atendidos",
  },
} as const;

export type Testimonial = {
  id: string;
  name?: string;
  role?: string;
  quote?: string;
  videoUrl?: string;
  photoUrl?: string;
};

// Depoimentos reais, recebidos via WhatsApp e revisados apenas na
// gramática/ortografia — o conteúdo e o sentido são exatamente os que os
// alunos enviaram. Nenhum nome, modalidade ou citação foi inventado.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sabrina",
    role: "Aluna Plus",
    quote:
      "Para ser sincera, comecei a gostar de aprender inglês por causa da professora Manu. Ela é ótima, as aulas com ela são incríveis. Na escola, eu estava com muita dificuldade, e com as aulas dela comecei a me interessar mais. 💛",
  },
  {
    id: "t2",
    name: "Kauane",
    role: "Aluna Premium",
    quote:
      "Estou adorando mesmo. Ela é muito paciente e está me ajudando demais. Começamos do zero e, aos poucos, estou vendo a evolução. A melhor parte é que não sinto como uma obrigação — está se tornando algo que eu gosto de verdade. Estou indicando vocês para o máximo de pessoas. Obrigada até aqui!",
  },
  {
    id: "t3",
    name: "Sílvia",
    role: "Aluna Premium",
    quote:
      "Recebi uma ótima aula. Como nunca tive acesso ao inglês, apenas na escola, e ela explicou muito bem, de uma forma que eu consegui entender. É muito esclarecida... nota 10!",
  },
  {
    id: "t4",
    name: "Maria",
    role: "Aluna Economic",
    quote:
      "Eu gostei muito dela. Ela ensina bem, é engraçada também, e me sinto muito confortável tendo aula com ela — o método de ensino dela realmente funciona!",
  },
  {
    id: "t5",
    name: "Micheli",
    role: "Aluna Premium",
    quote:
      "Foi uma experiência incrível! Confesso que estava com medo no início, mas a atenção e a paciência que o Rafael tem ao ensinar fazem esse medo ir embora ao longo da aula. Estou muito animada com essa nova etapa ☺️",
  },
  {
    id: "t6",
    name: "Érika",
    role: "Aluna Unique",
    quote:
      "Muito legal, gostei bastante. Nas minhas experiências com os outros dois professores, eu não tinha aprendido o que aprendi hoje. Pode ser \"besta\" para alguns, mas é bem importante para começar a aprender — é a base do inglês.",
  },
  {
    id: "t7",
    name: "Verúcia",
    role: "Aluna Premium",
    quote:
      "Nas minhas aulas de inglês com o professor Rafael, mesmo tendo muita dificuldade para aprender, ele tem uma dinâmica de explicação de um jeito que você consegue entender. São aulas em que você realmente aprende, não só finge que aprende, mas aprende de verdade.",
  },
  {
    id: "t8",
    name: "Lara",
    role: "Aluna Premium",
    quote: "Muito obrigada pela aula, eu amei! Superou minhas expectativas — foi excelente.",
  },
  {
    id: "t9",
    name: "Anna",
    role: "Aluna Premium",
    quote:
      "A experiência está sendo ótima. Tenho aprendido no meu ritmo, tirado dúvidas com mais facilidade e percebido uma boa evolução.",
  },
  {
    id: "t10",
    name: "William",
    role: "Aluno Premium",
    quote:
      "Nunca vi uma aula tão boa e confortante como essa. Aprendi mais com você sobre verb to be do que com a professora de lá — sem sacanagem, até voltaria a estudar lá só pra ter você como professor.",
  },
  {
    id: "t11",
    name: "Maria Clara",
    role: "Aluna Premium",
    quote:
      "Foi incrível! A aula do professor Rafael é bem dinâmica e divertida, além de explicar muito bem os conceitos. Ansiosa para a próxima aula!",
  },
  {
    id: "t12",
    name: "Lucas",
    role: "Aluno Premium",
    quote: "Olá! Foi ótimo, professor dedicado e paciente.",
  },
];

export const faq = {
  intro: {
    heading: "Perguntas frequentes",
  },
  items: [
    {
      question: "Preciso saber inglês para estudar na Snow Wison?",
      answer:
        "Não. A Snow Wison atende alunos em diferentes momentos de aprendizado. O diagnóstico inicial identifica seu ponto de partida, e o caminho é construído a partir dele.",
    },
    {
      question: "Vocês também ensinam crianças?",
      answer: "Sim. A Snow Wison ensina crianças a partir de 6 anos.",
    },
    {
      question: "As aulas são ao vivo?",
      answer: "Sim. Todas as aulas são ao vivo — nunca apenas gravadas.",
    },
    {
      question: "As aulas são online?",
      answer: "Sim. O ensino da Snow Wison é 100% online.",
    },
    {
      question: "Como funciona a avaliação?",
      answer:
        "Antes de começar, existe uma reunião de diagnóstico para entender seu momento atual e seu objetivo. A partir dela, o caminho é definido.",
    },
    {
      question: "Como vocês definem o programa?",
      answer:
        "A partir do seu objetivo e do diagnóstico inicial, definimos o conteúdo necessário para sua evolução e a forma como ele será aplicado.",
    },
    {
      question: "Como funciona o modelo Premium?",
      answer:
        "No Premium, as aulas são individuais. O professor avalia as características do aluno e faz uma leitura do seu perfil para definir qual abordagem traz mais resultados.",
    },
    {
      question: "Qual a diferença entre individual, dupla e grupo?",
      answer:
        "A diferença está no formato e no nível de personalização de cada experiência — não na qualidade do conteúdo, que segue o mesmo padrão nas três modalidades.",
    },
    {
      question: "Quanto tempo dura cada aula?",
      answer:
        "O tempo e a quantidade de aulas variam de acordo com o seu objetivo. Tudo isso é definido na reunião de diagnóstico.",
    },
    {
      question: "Como funciona o acompanhamento?",
      answer:
        "Sua evolução é acompanhada ao longo de todo o processo, com ajustes no caminho sempre que necessário.",
    },
    {
      question: "Como faço para começar?",
      answer:
        "Você entra em contato pelo WhatsApp, conversamos sobre seu objetivo, realizamos uma reunião de diagnóstico e, a partir dela, você começa suas aulas.",
    },
  ],
} as const;
