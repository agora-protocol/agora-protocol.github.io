---
id: getting-started
title: Getting Started
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

There are two ways to use Agora: as a sender agent (i.e. a client) or as a receiver agent (i.e. a server). An agent can also act as both a sender and a receiver.

In this quick tutorial, we'll establish a structured communication channel between two agents:

- A [LangChain](https://www.langchain.com/) agent that wants to retrieve temperature data
- A [Camel](https://www.camel-ai.org/) agent that has access to weather data

### Installation

```
pip install agora-protocol
```

For this tutorial, you'll also want to install the two agent frameworks:

```
pip install langchain_openai
pip install Pillow requests_oauthlib # Dependencies for camel-ai
pip install camel-ai
```

We'll use an OpenAI model as base. You can set the API key via the `OPENAI_API_KEY=` environmental variable.

### Sender

The Sender is an agent designed to execute **tasks**. Defining a task is as simple as taking a documented Python function and adding the `@sender.task` decorator.

```python
import agora
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")
toolformer = agora.toolformers.LangChainToolformer(model)

sender = agora.Sender.make_default(toolformer)

@sender.task()
def get_temperature(city : str) -> int:
  """
  Get the temperature for a given city.

  Parameters:
    city: The name of the city for which to retrieve the weather

  Returns:
    The temperature in °C for the given city.
  """
  pass
```

Note: any properly annotated function with Google-style docstrings can be automatically converted to a task. Refer to this page for other ways to describe tasks.

The function is automatically converted to a task function. A task function takes exactly the same arguments, in addition to a keyword-only argument `target` which represents the address of the remote agent.

```python
response = get_temperature('New York', target='http://localhost:5000')
print(response) # Output: 25
```

When running this code, the Sender agent will begin a conversation with the Receiver agent on `localhost:5000`. The two will exchange information first using natural language and then, depending on the need, with structured data and automatic routines (see [specification]). All of this is abstracted away and happens under the hood.

### Receiver

Let's now setup a Receiver instance on port 5000. This time, we'll use a Camel agent with one tool, `weather_db`:

```python
import agora
import camel.types # Needs to be installed separately

toolformer = agora.toolformers.CamelToolformer(
  camel.types.ModelPlatformType.OPENAI,
  camel.types.ModelType.GPT_4O
)


def weather_db(city: str) -> dict:
  """Gets the temperature and precipitation in a city.

  Args:
    city: The name of the city for which to retrieve the weather

  Returns:
    A dictionary containing the temperature and precipitation in the city (both ints)

  """
  # Put your tool logic here
  return {
    'temperature': 25,
    'precipitation': 12
  }


receiver = agora.Receiver.make_default(toolformer, tools=[weather_db])
```

A receiver needs to be wrapped in a server capable of handling HTTP queries. For convinience's sake, the Agora client provides a Flask server that does that out of the box:

```
server = agora.ReceiverServer(receiver)
server.run(port=5000)
```

We're done! The `get_temperature` task can now be used seamlessly in your custom workflow, or even by another agent.

### Next Steps

<BoxLink href="/docs/defining-tasks">Defining Tasks</BoxLink>
<BoxLink href="/docs/protocol/beginner-friendly">Protocol Specification</BoxLink>
