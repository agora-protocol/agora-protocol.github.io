---
id: defining-tasks
title: Defining Tasks
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

The simplest way to define a Task is with `@sender.task`:

```python
@sender.task()
def get_temperature(city : str) -> float:
  """
  Get the temperature for a given city.

  Parameters:
    city: The name of the city for which to retrieve the weather

  Returns:
    The temperature in °C for the given city.
  """
  pass
```

`@sender.task` performs a best-effort parsing of the docstring and the type annotations. It will however fail with incomplete information. This gives us two options:

- Overriding the parsing
- Using an LLM-based parser

### Overriding the Parsing

By passing arguments to `@sender.task`, you can override the parsed schema:

```python
@sender.task(
  task_id='get_temperature',
  description='Get the temperature for a given city.',
  input_schema={
    'type': 'object',
    'properties': {
      'city': {
        'type': 'string',
        'description': 'The name of the city for which to retrieve the weather'
      }
    },
    'required': ['city']
  },
  output_schema={
    'type': 'number',
    'description': 'The temperature in °C for the given city.'
  }
)
def get_temperature(city):
  pass
```

### LLM-Based Parsing

Alternatively, by passing the argument `parser` to @sender.

## Raw API

If you want full control over a task schema, you can programmatically define one using `TaskSchema`.

```python
import agora

task_schema = agora.TaskSchema(
  description='Get the temperature for a given city.',
  input_schema={
    'type': 'object',
    'properties': {
      'city': {
        'type': 'string',
        'description': 'The name of the city for which to retrieve the weather'
      }
    },
    'required': ['city']
  },
  output_schema={
    'type': 'number',
    'description': 'The temperature in °C for the given city.'
  }
)
```

The `TaskSchema` can be used to override the fields of a task::

```python
@sender.task(**task_schema.fields)
def get_temperature(city):
  pass
```

or, if you prefer, you can directly call the sender with `sender.execute_task`:

```python
sender.execute_task(
  task_id='get_temperature',
  task_schema=task_schema,
  task_data={ 'city': 'New York' },
  target='http://localhost:5000'
)
```

### Should I Use @sender.task or the Raw API?

Use `@sender.task` when:

- You are developing prebuilt, well-specified tasks
- You want to maximize readability

Use the raw API when:

- You want full control over the task schema
- You are creating tasks programmatically

## Next Steps

<BoxLink href="/docs/protocol/beginner-friendly">Protocol Specification</BoxLink>
